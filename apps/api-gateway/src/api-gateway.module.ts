import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './microservices/auth/auth.module';
import { PatientModule } from './microservices/patient/patient.module';
import { AppointmentModule } from './microservices/appointment/appointment.module';
import { envValidationSchema } from './config/joi.validation';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { UserCacheInterceptor } from './interceptors/user-cache.interceptor';

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
                    limit: 50, // Maximum number of requests within ttl milliseconds
                },
            ],
        }),
        CacheModule.registerAsync({
            useFactory: async () => {
                return {
                    stores: [createKeyv(process.env.REDIS_URL)],
                    ttl: 60000,
                };
            },
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
        {
            provide: APP_INTERCEPTOR,
            useClass: UserCacheInterceptor,
        },
    ],
})
export class ApiGatewayModule {}
