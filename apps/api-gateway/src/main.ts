import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';

async function bootstrap() {
    const app = await NestFactory.create(ApiGatewayModule);
    const port = process.env.port;
    await app.listen(port);
    console.log('\x1b[36m%s\x1b[0m', `ApiGateway is running on port: ${port}`);
}
bootstrap();
