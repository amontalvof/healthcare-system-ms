import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { CommonUtilsService } from '@app/common-utils';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const commonUtils = new CommonUtilsService();
    const app = await NestFactory.create(ApiGatewayModule);

    app.enableCors({
        origin: process.env.CORS_ORIGIN,
        methods: process.env.CORS_METHODS,
        credentials: true,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // remove non-whitelisted properties
            forbidNonWhitelisted: true, // throw an error when non-whitelisted properties are present
        }),
    );

    const PORT = process.env.PORT;
    await app.listen(PORT);
    commonUtils.colorLogger({
        type: 'log',
        message: `ApiGateway is running on port: ${PORT}`,
    });
}
bootstrap();
