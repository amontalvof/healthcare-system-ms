import { BadRequestException, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { AppointmentPaymentSession } from './types/appointmentPaymentSession';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { InjectModel } from '@nestjs/mongoose';
import { Payment } from '@app/common-utils/db/mongo/schemas/payment.schema';
import { Model } from 'mongoose';
import { IRefundPayment } from './types/refundPayment';
import { Refund } from '@app/common-utils/db/mongo/schemas/refund.schema';

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class BillingService {
    private readonly stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    constructor(
        @InjectModel(Payment.name)
        private readonly paymentModel: Model<Payment>,
        @InjectModel(Refund.name)
        private readonly refundModel: Model<Refund>,
    ) {}

    async createPaymentSession(
        userId: string,
        appointmentPaymentSession: AppointmentPaymentSession,
    ) {
        const { currency, items } = appointmentPaymentSession;

        const lineItems = items.map((item) => {
            // If your times are local, you can omit .tz(); otherwise supply your zone.
            const dateOnly = dayjs(item.date, 'YYYY-MM-DD');
            const startDate = dayjs(
                `${item.date} ${item.startTime}`,
                'YYYY-MM-DD HH:mm',
            );
            const endDate = dayjs(
                `${item.date} ${item.endTime}`,
                'YYYY-MM-DD HH:mm',
            );

            const formattedDate = dateOnly.format('MMMM D, YYYY'); // e.g. "August 15, 2025"
            const formattedStart = startDate.format('h:mm A'); // e.g. "2:00 PM"
            const formattedEnd = endDate.format('h:mm A'); // e.g. "2:30 PM"

            return {
                price_data: {
                    currency,
                    unit_amount: Math.round(item.price * 100), // cents
                    product_data: {
                        name: `Appointment with Dr. ${item.doctorName} (${item.doctorDegree})`,
                        description: `Patient: ${item.patientName} Date: ${formattedDate} Time: ${formattedStart} – ${formattedEnd}`,
                    },
                },
                quantity: item.quantity,
            };
        });

        return this.stripe.checkout.sessions.create({
            metadata: {
                userId,
                appointment_ids: JSON.stringify(
                    items.map((i) => i.appointmentId),
                ),
            },
            line_items: lineItems,
            mode: 'payment',
            ui_mode: 'embedded',
            return_url: process.env.STRIPE_RETURN_URL || '',
            payment_method_configuration: process.env.STRIPE_PMC,
            payment_intent_data: {},
        });
    }

    async refundPayment(data: {
        userId: string;
        refundPayment: IRefundPayment;
    }) {
        const userId = data.userId;
        const {
            paymentIntentId,
            amount,
            reason,
            idempotencyKey,
            appointmentId,
        } = data.refundPayment;
        const opts = idempotencyKey ? { idempotencyKey } : undefined;
        return this.stripe.refunds.create(
            {
                payment_intent: paymentIntentId,
                amount,
                reason,
                metadata: {
                    userId,
                    appointmentId,
                },
            },
            opts,
        );
    }

    async checkAreAppointmentsPaid(appointmentIds: string[]) {
        const payments = await this.paymentModel
            .find({
                'metadata.appointment_ids': { $in: appointmentIds },
                payment_status: 'paid',
            })
            .lean();
        return appointmentIds.map((id) => {
            const payment = payments.find((p) =>
                p.metadata.appointment_ids.includes(id),
            );
            return {
                appointmentId: id,
                isPaid: !!payment,
                paymentId: payment ? payment._id : null,
                paymentIntentId: payment ? payment.payment_intent_id : null,
            };
        });
    }

    async handleRefundCreated(refundId: string) {
        const refund = await this.stripe.refunds.retrieve(refundId, {
            expand: ['charge', 'charge.payment_intent'],
        });
        return await this.refundModel
            .findOneAndUpdate(
                { refund_id: refund.id },
                {
                    $set: {
                        payment_intent_id: refund.payment_intent,
                        charge_id: (refund.charge as Stripe.Charge).id,
                        amount: refund.amount,
                        currency: refund.currency,
                        status: refund.status,
                        reason: refund.reason,
                        balance_transaction_id:
                            (refund.balance_transaction as string) ?? null,
                        created_at_unix: refund.created,
                        metadata: this.parseMeta(refund.metadata),
                    },
                    $setOnInsert: { refund_id: refund.id },
                },
                { upsert: true, new: true },
            )
            .lean();
    }

    async upsertPaymentFromSession(data: { sessionId: string }) {
        const session = await this.stripe.checkout.sessions.retrieve(
            data.sessionId,
            {
                expand: [
                    'payment_intent',
                    'payment_intent.latest_charge',
                    'line_items.data.price.product',
                ],
            },
        );
        const pi = session.payment_intent as Stripe.PaymentIntent | null;
        const charge = (pi?.latest_charge as Stripe.Charge) || null;

        const lineItems = this.extractLineItems(session);

        const paymentData: Partial<Payment> = {
            payment_intent_id: pi?.id,
            latest_charge_id: charge?.id,
            livemode: !!session.livemode,

            amount_total: session.amount_total ?? pi?.amount ?? 0,
            currency: session.currency ?? undefined,
            amount_subtotal: session.amount_subtotal ?? undefined,
            amount_tax: session.total_details?.amount_tax ?? undefined,
            amount_discount:
                session.total_details?.amount_discount ?? undefined,

            status: session.status ?? undefined,
            payment_status: session.payment_status ?? undefined,
            // async_status: data.async_status,

            customer_id: (session.customer as string) ?? undefined,
            customer_email: session.customer_details?.email ?? undefined,

            payment_method_id: (pi?.payment_method as string) ?? undefined,
            line_items: lineItems,
            card: charge?.payment_method_details?.card
                ? {
                      brand: charge.payment_method_details.card.brand,
                      last4: charge.payment_method_details.card.last4,
                      exp_month: charge.payment_method_details.card.exp_month,
                      exp_year: charge.payment_method_details.card.exp_year,
                      funding: charge.payment_method_details.card.funding,
                  }
                : undefined,

            balance_transaction_id:
                (charge?.balance_transaction as string | undefined) ??
                undefined,
            receipt_url: charge?.receipt_url ?? undefined,

            metadata: this.parseMeta(session.metadata),

            created_at_unix: session.created,
        };

        return await this.paymentModel
            .findOneAndUpdate(
                { session_id: session.id },
                { $set: paymentData, $setOnInsert: { session_id: session.id } },
                { upsert: true, new: true },
            )
            .lean();
    }

    private parseMeta(meta: Record<string, string> | undefined) {
        if (!meta) {
            return {};
        }
        return Object.keys(meta).reduce(
            (acc, key) => {
                const value = meta[key];
                try {
                    acc[key] = JSON.parse(value);
                } catch {
                    const num = Number(value);
                    acc[key] = isNaN(num) ? value : num;
                }
                return acc;
            },
            {} as Record<string, any>,
        );
    }

    private extractLineItems(session: Stripe.Checkout.Session) {
        return (session.line_items?.data ?? []).map((li) => ({
            description:
                li.description ??
                (typeof li.price?.product === 'object'
                    ? (li.price.product as Stripe.Product).name
                    : ''),
            unit_amount: li.price?.unit_amount ?? 0,
            quantity: li.quantity ?? 1,
            currency: li.currency ?? session.currency!,
        }));
    }
}
