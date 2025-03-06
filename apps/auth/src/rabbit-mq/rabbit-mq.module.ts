import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMqService } from './rabbit-mq.service';
import { RabbitMqController } from './rabbit-mq.controller';
import { QUEUE_CLIENT_NAMES } from '../config/constants';

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: QUEUE_CLIENT_NAMES.NOTIFICATION_RMQ_CLIENT,
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.RMQ,
                    options: {
                        urls: [configService.get<string>('RMQ_URL')],
                        queue: configService.get<string>('NOTIFICATION_QUEUE'),
                        queueOptions: { durable: false },
                    },
                }),
            },
        ]),
    ],
    controllers: [RabbitMqController],
    providers: [RabbitMqService],
    exports: [ClientsModule],
})
export class RabbitMqModule {}
