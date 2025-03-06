import { Controller } from '@nestjs/common';
import { RabbitMqService } from './rabbit-mq.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('rabbit-mq')
export class RabbitMqController {
    constructor(private readonly rabbitMqService: RabbitMqService) {}

    @EventPattern('send.verification.code')
    handleTestEvent(data: any) {
        console.log('Consumer received event:', data);
        return this.rabbitMqService.handleTestEvent(data);
    }
}
