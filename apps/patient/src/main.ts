import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PatientModule } from './patient.module';
import { CommonUtilsService } from '@app/common-utils';
import { QUEUE_NAMES } from '@app/common-utils/queues/constants';

async function bootstrap() {
    const commonUtils = new CommonUtilsService();
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        PatientModule,
        {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RMQ_URL],
                queue: QUEUE_NAMES.PATIENT_QUEUE,
                queueOptions: { durable: true, autoDelete: false },
                socketOptions: {
                    heartbeat: process.env.NODE_ENV === 'development' ? 0 : 120, // 120 seconds
                },
            },
        },
    );

    await app.listen();
    commonUtils.colorLogger({
        type: 'log',
        message: `Patient microservice is listening for events...`,
    });
}
bootstrap();
