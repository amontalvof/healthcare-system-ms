import { Controller } from '@nestjs/common';
import { BillingService } from './billing.service';
import { MessagePattern } from '@nestjs/microservices';
import { AppointmentPaymentSession } from './types/appointmentPaymentSession';
import { IRefundPayment } from './types/refundPayment';

@Controller()
export class BillingController {
    constructor(private readonly billingService: BillingService) {}

    @MessagePattern({ cmd: 'create.payment.session' })
    createPaymentSession({
        userId,
        appointmentPaymentSession,
    }: {
        userId: string;
        appointmentPaymentSession: AppointmentPaymentSession;
    }) {
        return this.billingService.createPaymentSession(
            userId,
            appointmentPaymentSession,
        );
    }

    @MessagePattern({ cmd: 'checkout.session.completed' })
    async handleAsyncPaymentSucceeded(data: { sessionId: string }) {
        return this.billingService.upsertPaymentFromSession(data);
    }

    @MessagePattern({ cmd: 'refund.payment' })
    refundPayment(data: { userId: string; refundPayment: IRefundPayment }) {
        return this.billingService.refundPayment(data);
    }

    @MessagePattern({ cmd: 'check.appointments.paid' })
    async checkAreAppointmentsPaid({
        appointmentIds,
    }: {
        appointmentIds: string[];
    }) {
        return this.billingService.checkAreAppointmentsPaid(appointmentIds);
    }

    @MessagePattern({ cmd: 'refund.created' })
    async handleRefundCreated(data: { refundId: string }) {
        return this.billingService.handleRefundCreated(data.refundId);
    }
}
