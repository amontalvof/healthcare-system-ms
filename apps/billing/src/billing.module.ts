import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonUtilsModule } from '@app/common-utils';
import { envValidationSchema } from './config/joi.validation';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
    QUEUE_CLIENT_NAMES,
    QUEUE_NAMES,
} from '@app/common-utils/queues/constants';
import { MongooseModule } from '@nestjs/mongoose';
import {
    Payment,
    PaymentSchema,
} from '@app/common-utils/db/mongo/schemas/payment.schema';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
            validationSchema: envValidationSchema,
        }),
        MongooseModule.forRoot(process.env.MONGO_DB_URI),
        MongooseModule.forFeature([
            { name: Payment.name, schema: PaymentSchema },
        ]),
        CommonUtilsModule,
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
                        queueOptions: { durable: true, autoDelete: false },
                    },
                }),
            },
        ]),
    ],
    controllers: [BillingController],
    providers: [BillingService],
})
export class BillingModule {}
