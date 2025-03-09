import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificationController } from './notification.controller';
import { envValidationSchema } from './config/joi.validation';

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
    ],
    controllers: [NotificationController],
    providers: [NotificationService],
})
export class NotificationModule {}
