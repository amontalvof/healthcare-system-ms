import { Request, Response } from 'express';
import { QUEUE_CLIENT_NAMES } from '@app/common-utils/queues/constants';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { AppointmentPaymentSessionDto } from './dtos/appointment-payment-session.dto';
import stripe from 'stripe';
import { IJwtUser } from '@app/common-utils/jwt/user';
import { RefundPaymentDto } from './dtos/refund-payment.dto';

@Injectable()
export class BillingService {
    constructor(
        @Inject(QUEUE_CLIENT_NAMES.BILLING_RMQ_CLIENT)
        private readonly billingClient: ClientProxy,
    ) {}

    createPaymentSession(
        user: IJwtUser,
        appointmentPaymentSessionDto: AppointmentPaymentSessionDto,
    ) {
        return lastValueFrom(
            this.billingClient.send(
                { cmd: 'create.payment.session' },
                {
                    userId: user.userId,
                    appointmentPaymentSession: appointmentPaymentSessionDto,
                },
            ),
        );
    }

    refundPayment(user: IJwtUser, refundPaymentDto: RefundPaymentDto) {
        return lastValueFrom(
            this.billingClient.send(
                { cmd: 'refund.payment' },
                { userId: user.userId, refundPayment: refundPaymentDto },
            ),
        );
    }

    async webhook(req: Request, res: Response) {
        const signature = req.headers['stripe-signature'] as string;
        // rawBody is available thanks to { rawBody: true } + bodyParser.raw()
        const payload = (req as any).rawBody as Buffer;
        let event: stripe.Event;
        try {
            event = stripe.webhooks.constructEvent(
                payload,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET,
            );
        } catch (error) {
            const message = (error as Error).message || 'Unknown error';
            return res.status(400).send(`Webhook Error: ${message}`);
        }
        // Handle the event
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as stripe.Checkout.Session;
                await lastValueFrom(
                    this.billingClient.send(
                        { cmd: 'checkout.session.completed' },
                        { sessionId: session.id },
                    ),
                );
                break;
            }
            case 'refund.created':
                const refund = event.data.object as stripe.Refund;
                await lastValueFrom(
                    this.billingClient.send(
                        { cmd: 'refund.created' },
                        { refundId: refund.id },
                    ),
                );
                break;
            default:
                break;
        }

        return res.status(200).json({ received: true });
    }
}
