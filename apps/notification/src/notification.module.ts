import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ConfigModule } from '@nestjs/config';
import { NotificationController } from './notification.controller';
import { envValidationSchema } from './config/joi.validation';
import { RabbitMqModule } from './rabbit-mq/rabbit-mq.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath:
                process.env.NODE_ENV === 'production'
                    ? '.env'
                    : './apps/notification/.env',
            validationSchema: envValidationSchema,
        }),
        RabbitMqModule,
    ],
    controllers: [NotificationController],
    providers: [NotificationService],
})
export class NotificationModule {}
