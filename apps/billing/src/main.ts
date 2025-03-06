import { NestFactory } from '@nestjs/core';
import { BillingModule } from './billing.module';

async function bootstrap() {
    const app = await NestFactory.create(BillingModule);
    const port = process.env.port;
    await app.listen(port);
    console.log('\x1b[36m%s\x1b[0m', `Billing is running on port: ${port}`);
}
bootstrap();
