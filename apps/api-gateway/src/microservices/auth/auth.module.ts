import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
    QUEUE_CLIENT_NAMES,
    QUEUE_NAMES,
} from '@app/common-utils/queues/constants';
@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: QUEUE_CLIENT_NAMES.AUTH_RMQ_CLIENT,
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => {
                    return {
                        transport: Transport.RMQ,
                        options: {
                            urls: [configService.get<string>('RMQ_URL')],
                            queue: QUEUE_NAMES.AUTH_QUEUE,
                            queueOptions: { durable: true, autoDelete: false },
                        },
                    };
                },
            },
        ]),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [ClientsModule],
})
export class AuthModule {}
