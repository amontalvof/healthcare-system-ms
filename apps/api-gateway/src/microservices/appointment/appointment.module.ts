import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
    JwtStrategy,
    QUEUE_CLIENT_NAMES,
    QUEUE_NAMES,
} from '@app/common-utils';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: QUEUE_CLIENT_NAMES.APPOINTMENT_RMQ_CLIENT,
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.RMQ,
                    options: {
                        urls: [configService.get<string>('RMQ_URL')],
                        queue: QUEUE_NAMES.APPOINTMENT_QUEUE,
                        queueOptions: { durable: false },
                    },
                }),
            },
        ]),
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRATION },
        }),
    ],
    controllers: [AppointmentController],
    providers: [AppointmentService, JwtStrategy],
})
export class AppointmentModule {}
