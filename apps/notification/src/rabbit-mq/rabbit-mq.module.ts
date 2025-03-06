import { Module } from '@nestjs/common';
import { RabbitMqService } from './rabbit-mq.service';
import { RabbitMqController } from './rabbit-mq.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QUEUE_CLIENT_NAMES } from '../config/constants';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: QUEUE_CLIENT_NAMES.AUTH_RMQ_CLIENT,
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.RMQ,
                    options: {
                        urls: [configService.get<string>('RMQ_URL')],
                        queue: configService.get<string>('AUTH_QUEUE'),
                        queueOptions: { durable: false },
                    },
                }),
            },
        ]),
    ],
    controllers: [RabbitMqController],
    providers: [RabbitMqService],
})
export class RabbitMqModule {}
