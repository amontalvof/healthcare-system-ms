import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { CommonUtilsService } from '@app/common-utils';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

    // Swagger configuration
    const config = new DocumentBuilder()
        .setTitle('Healthcare API')
        .setDescription('API documentation for the Healthcare system')
        .setVersion('1.0')
        .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        })
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);

    const PORT = process.env.PORT;
    await app.listen(PORT);
    commonUtils.colorLogger({
        type: 'log',
        message: `ApiGateway is running on port: ${PORT}`,
    });
}
bootstrap();
