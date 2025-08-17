import { Controller } from '@nestjs/common';
import { BillingService } from './billing.service';
import { MessagePattern } from '@nestjs/microservices';
import { AppointmentPaymentSession } from './types/appointmentPaymentSession';

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
        return this.billingService.snapshotAndUpsertFromSession(data);
    }

    @MessagePattern({ cmd: 'check.appointments.paid' })
    async checkAreAppointmentsPaid({
        appointmentIds,
    }: {
        appointmentIds: string[];
    }) {
        return this.billingService.checkAreAppointmentsPaid(appointmentIds);
    }
}
