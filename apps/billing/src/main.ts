import { NestFactory } from '@nestjs/core';
import { BillingModule } from './billing.module';
import { CommonUtilsService } from '@app/common-utils';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { QUEUE_NAMES } from '@app/common-utils/queues/constants';

async function bootstrap() {
    const commonUtils = new CommonUtilsService();
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        BillingModule,
        {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RMQ_URL],
                queue: QUEUE_NAMES.BILLING_QUEUE,
                queueOptions: { durable: true, autoDelete: false },
            },
        },
    );
    await app.listen();
    commonUtils.colorLogger({
        type: 'log',
        message: `Billing microservice is listening for events...`,
    });
}
bootstrap();
