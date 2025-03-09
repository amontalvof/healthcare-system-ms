import { NestFactory } from '@nestjs/core';
import { PatientModule } from './patient.module';
import { CommonUtilsService, QUEUE_NAMES } from '@app/common-utils';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const commonUtils = new CommonUtilsService();
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        PatientModule,
        {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RMQ_URL],
                queue: QUEUE_NAMES.PATIENT_QUEUE,
                queueOptions: { durable: false },
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
