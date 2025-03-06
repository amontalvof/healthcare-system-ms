import { Controller } from '@nestjs/common';
import { RabbitMqService } from './rabbit-mq.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('rabbit-mq')
export class RabbitMqController {
    constructor(private readonly rabbitMqService: RabbitMqService) {}

    @EventPattern('some.auth.event')
    handleAuthEvent(data: any) {
        this.rabbitMqService.handleAuthEvent(data);
    }
}
