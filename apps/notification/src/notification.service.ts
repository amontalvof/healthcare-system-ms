import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
    handleTestEvent(data: any): string {
        return 'Sent event to RabbitMQ!';
    }
}
