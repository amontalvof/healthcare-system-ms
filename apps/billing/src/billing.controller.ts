import { Controller } from '@nestjs/common';
import { BillingService } from './billing.service';
import { MessagePattern } from '@nestjs/microservices';
import { AppointmentPaymentSession } from './types/appointmentPaymentSession';

@Controller()
export class BillingController {
    constructor(private readonly billingService: BillingService) {}

    @MessagePattern({ cmd: 'create.payment.session' })
    createPaymentSession(appointmentPaymentSession: AppointmentPaymentSession) {
        return this.billingService.createPaymentSession(
            appointmentPaymentSession,
        );
    }

    @MessagePattern({ cmd: 'checkout.session.completed' })
    async handleAsyncPaymentSucceeded(data: { sessionId: string }) {
        return this.billingService.snapshotAndUpsertFromSession(data);
    }
}
