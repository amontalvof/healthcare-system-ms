import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { QUEUE_CLIENT_NAMES } from '../config/constants';

@Injectable()
export class RabbitMqService {
    constructor(
        @Inject(QUEUE_CLIENT_NAMES.AUTH_RMQ_CLIENT)
        private readonly client: ClientProxy,
    ) {}

    handleTestEvent(data: any): string {
        return 'Sent event to RabbitMQ!';
    }
}
