import { NestFactory } from '@nestjs/core';
import { AppointmentModule } from './appointment.module';
import { CommonUtilsService, QUEUE_NAMES } from '@app/common-utils';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const commonUtils = new CommonUtilsService();
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppointmentModule,
        {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RMQ_URL],
                queue: QUEUE_NAMES.APPOINTMENT_QUEUE,
                queueOptions: { durable: false },
            },
        },
    );

    await app.listen();
    commonUtils.colorLogger({
        type: 'log',
        message: `Appointment microservice is listening for events...`,
    });
}
bootstrap();
