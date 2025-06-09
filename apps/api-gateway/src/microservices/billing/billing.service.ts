import { QUEUE_CLIENT_NAMES } from '@app/common-utils/queues/constants';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class BillingService {
    constructor(
        @Inject(QUEUE_CLIENT_NAMES.BILLING_RMQ_CLIENT)
        private readonly billingClient: ClientProxy,
    ) {}
    createPaymentSession() {
        return lastValueFrom(
            this.billingClient.send({ cmd: 'create.payment.session' }, {}),
        );
    }
}
