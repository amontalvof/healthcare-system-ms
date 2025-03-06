import { NestFactory } from '@nestjs/core';
import { PatientModule } from './patient.module';
import { CommonUtilsService } from '@app/common-utils';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const commonUtils = new CommonUtilsService();
    const app = await NestFactory.create(PatientModule);

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
            queue: process.env.PATIENT_QUEUE,
            queueOptions: { durable: false },
        },
    });

    await app.listen(PORT);

    commonUtils.colorLogger({
        type: 'log',
        message: `Patient is running on port: ${PORT}`,
    });
}
bootstrap();
