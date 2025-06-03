import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from 'apps/api-gateway/src/config/joi.validation';
import { CommonUtilsModule } from '@app/common-utils';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
            validationSchema: envValidationSchema,
        }),
        CommonUtilsModule,
    ],
    controllers: [BillingController],
    providers: [BillingService],
})
export class BillingModule {}
