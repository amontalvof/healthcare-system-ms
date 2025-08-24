import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { CommonUtilsService } from '@app/common-utils';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const commonUtils = new CommonUtilsService();
    const app = await NestFactory.create(ApiGatewayModule, { rawBody: true });

    app.setGlobalPrefix('api');

    app.enableCors({
        origin: process.env.CORS_ORIGIN?.split(',') ?? '*',
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

    const PORT = Number(process.env.PORT ?? 3000);
    await app.listen(PORT, '0.0.0.0');
    // Log a friendly URL (Heroku sets APP_NAME in dyno metadata only if enabled, so use HEROKU_APP_NAME fallback)
    const appUrl =
        process.env.APP_BASE_URL || // set this in Heroku config if you want (e.g., https://healtcare-ms-backend-...herokuapp.com)
        `http://localhost:${PORT}`;

    commonUtils.colorLogger({
        type: 'log',
        message: `API listening on ${appUrl}`,
    });
    commonUtils.colorLogger({
        type: 'log',
        message: `Swagger at ${appUrl}/api-docs`,
    });
}
bootstrap();
