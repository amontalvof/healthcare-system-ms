import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ConfigModule } from '@nestjs/config';
import { NotificationController } from './notification.controller';
import { envValidationSchema } from './config/joi.validation';
import { CommonUtilsModule } from '@app/common-utils';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: './apps/notification/.env',
            validationSchema: envValidationSchema,
        }),
        CommonUtilsModule,
    ],
    controllers: [NotificationController],
    providers: [NotificationService],
})
export class NotificationModule {}
