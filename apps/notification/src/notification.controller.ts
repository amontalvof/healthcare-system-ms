import { Controller } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @EventPattern('send.verification.code')
    handleVerificationCodeEvent(data: any) {
        console.log('send.verification.code', data);
        return this.notificationService.handleTestEvent(data);
    }

    @EventPattern('send.appointment.scheduled')
    handleAppointmentScheduledEvent(data: any) {
        console.log('send.appointment.scheduled', data);
        return this.notificationService.handleTestEvent(data);
    }
}
