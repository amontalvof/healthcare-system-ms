import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppointmentModule } from './appointment.module';
import { CommonUtilsService } from '@app/common-utils';
import { QUEUE_NAMES } from '@app/common-utils/queues/constants';

async function bootstrap() {
    const commonUtils = new CommonUtilsService();
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppointmentModule,
        {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.CLOUDAMQP_URL],
                queue: QUEUE_NAMES.APPOINTMENT_QUEUE,
                queueOptions: { durable: true, autoDelete: false },
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
