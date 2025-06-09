import { Controller, Get, Post } from '@nestjs/common';
import { BillingService } from './billing.service';

@Controller('billing')
export class BillingController {
    constructor(private readonly billingService: BillingService) {}
    @Post('create-payment-session')
    createPaymentSession() {
        return this.billingService.createPaymentSession();
    }

    @Get('success')
    success() {
        return 'Payment successful!';
    }

    @Get('cancel')
    cancel() {
        return 'Payment cancelled.';
    }

    @Post('webhook')
    async webhook() {
        return 'Webhook received.';
    }
}
