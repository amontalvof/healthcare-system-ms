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
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from '@app/common-utils/db/postgres/schemas/patient.entity';
import { Doctor } from '@app/common-utils/db/postgres/schemas/doctor.entity';
import { Appointment } from '@app/common-utils/db/postgres/schemas/appointment.entity';
import { CommonUtilsModule } from '@app/common-utils';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
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
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [Patient, Doctor, Appointment],
            synchronize: process.env.NODE_ENV !== 'production',
        }),
        TypeOrmModule.forFeature([Patient, Doctor, Appointment]),
        CommonUtilsModule,
    ],
    controllers: [AppointmentController],
    providers: [AppointmentService],
})
export class AppointmentModule {}
