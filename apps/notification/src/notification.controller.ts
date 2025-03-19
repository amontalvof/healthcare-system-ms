import { Controller } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EventPattern } from '@nestjs/microservices';
import { IUserCode } from './types/user';
import { IAppointment } from './types/appointment';

@Controller()
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @EventPattern('send.verification.code')
    handleVerificationCodeEvent(data: IUserCode) {
        return this.notificationService.sendVerificationCode(data);
    }

    @EventPattern('send.appointment.scheduled')
    handleAppointmentScheduledEvent(data: IAppointment) {
        return this.notificationService.sendAppointmentScheduled(data);
    }
}
