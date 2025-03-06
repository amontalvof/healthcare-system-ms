import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        NotificationModule,
        {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RMQ_URL],
                queue: process.env.NOTIFICATION_QUEUE,
                queueOptions: { durable: false },
            },
        },
    );

    await app.listen();
    console.log('Consumer microservice is listening for events...');
}
bootstrap();
