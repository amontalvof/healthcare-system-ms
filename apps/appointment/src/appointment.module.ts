import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envValidationSchema } from './config/joi.validation';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
    QUEUE_CLIENT_NAMES,
    QUEUE_NAMES,
} from '@app/common-utils/queues/constants';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath:
                process.env.NODE_ENV === 'production'
                    ? '.env'
                    : './apps/appointment/.env',
            validationSchema: envValidationSchema,
        }),
        ClientsModule.registerAsync([
            {
                name: QUEUE_CLIENT_NAMES.NOTIFICATION_RMQ_CLIENT,
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.RMQ,
                    options: {
                        urls: [configService.get<string>('RMQ_URL')],
                        queue: QUEUE_NAMES.NOTIFICATION_QUEUE,
                        queueOptions: { durable: false },
                    },
                }),
            },
        ]),
    ],
    controllers: [AppointmentController],
    providers: [AppointmentService],
})
export class AppointmentModule {}
