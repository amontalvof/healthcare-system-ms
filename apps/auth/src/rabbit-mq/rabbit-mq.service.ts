import { Injectable } from '@nestjs/common';

@Injectable()
export class RabbitMqService {
    handleAuthEvent(data: any) {
        console.log('Received authentication event andy:', data);
        // Process the event data as needed
    }
}
