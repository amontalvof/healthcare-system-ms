import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './microservices/auth/auth.module';
import { PatientModule } from './microservices/patient/patient.module';
import { AppointmentModule } from './microservices/appointment/appointment.module';
import { envValidationSchema } from './config/joi.validation';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath:
                process.env.NODE_ENV === 'production'
                    ? '.env'
                    : './apps/api-gateway/.env',
            validationSchema: envValidationSchema,
        }),
        ThrottlerModule.forRoot({
            throttlers: [
                {
                    ttl: 60000, // Time to live in milliseconds
                    limit: 5, // Maximum number of requests within ttl milliseconds
                },
            ],
        }),
        AuthModule,
        PatientModule,
        AppointmentModule,
    ],
    controllers: [ApiGatewayController],
    providers: [
        ApiGatewayService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class ApiGatewayModule {}
