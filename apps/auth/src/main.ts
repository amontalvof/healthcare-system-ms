import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CommonUtilsService } from '@app/common-utils';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const commonUtils = new CommonUtilsService();
    const app = await NestFactory.create(AuthModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // remove non-whitelisted properties
            forbidNonWhitelisted: true, // throw an error when non-whitelisted properties are present
        }),
    );

    const PORT = process.env.PORT;

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            urls: [process.env.RMQ_URL],
            queue: process.env.AUTH_QUEUE,
            queueOptions: { durable: false },
        },
    });

    await app.startAllMicroservices();
    await app.listen(PORT);

    commonUtils.colorLogger({
        type: 'log',
        message: `Auth is running on port: ${PORT}`,
    });
}
bootstrap();
