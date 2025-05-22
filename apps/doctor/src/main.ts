import { NestFactory } from '@nestjs/core';
import { DoctorModule } from './doctor.module';
import { CommonUtilsService } from '@app/common-utils';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { QUEUE_NAMES } from '@app/common-utils/queues/constants';

async function bootstrap() {
    const commonUtils = new CommonUtilsService();
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        DoctorModule,
        {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RMQ_URL],
                queue: QUEUE_NAMES.DOCTOR_QUEUE,
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
        message: `Doctor microservice is listening for events...`,
    });
}
bootstrap();
