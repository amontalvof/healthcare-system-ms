import { Controller } from '@nestjs/common';
import { BillingService } from './billing.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class BillingController {
    constructor(private readonly billingService: BillingService) {}

    @MessagePattern({ cmd: 'create.payment.session' })
    createPaymentSession() {
        return this.billingService.createPaymentSession();
    }
}
