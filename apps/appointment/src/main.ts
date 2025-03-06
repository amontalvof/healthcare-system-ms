import { NestFactory } from '@nestjs/core';
import { AppointmentModule } from './appointment.module';

async function bootstrap() {
    const app = await NestFactory.create(AppointmentModule);
    const port = process.env.port;
    await app.listen(port);
    console.log('\x1b[36m%s\x1b[0m', `Appointment is running on port: ${port}`);
}
bootstrap();
