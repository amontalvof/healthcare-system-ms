import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@app/common-utils/jwt/jwt.strategy';
import {
    QUEUE_CLIENT_NAMES,
    QUEUE_NAMES,
} from '@app/common-utils/queues/constants';

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: QUEUE_CLIENT_NAMES.PATIENT_RMQ_CLIENT,
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.RMQ,
                    options: {
                        urls: [configService.get<string>('RMQ_URL')],
                        queue: QUEUE_NAMES.PATIENT_QUEUE,
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
    controllers: [PatientController],
    providers: [PatientService, JwtStrategy],
})
export class PatientModule {}
