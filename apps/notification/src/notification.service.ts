import { CommonUtilsService } from '@app/common-utils';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const sgMail = require('@sendgrid/mail');
import { VERIFICATION_EMAIL_TEMPLATE } from './templates/verification-email';
import { IUserCode } from './types/user';
import { IAppointment } from './types/appointment';
import { APPOINTMENT_SCHEDULED_TEMPLATE } from './templates/scheduled-appointment';

@Injectable()
export class NotificationService {
    private readonly logger = new Logger(NotificationService.name);
    constructor(
        private readonly configService: ConfigService,
        private readonly commonUtilsService: CommonUtilsService,
    ) {
        const sendGridApiKey =
            this.configService.get<string>('SENDGRID_API_KEY');
        sgMail.setApiKey(sendGridApiKey);
    }
    sendAppointmentScheduled(data: IAppointment) {
        const fromEmail = this.configService.get<string>('SENDGRID_FROM_EMAIL');
        const htmlWithDetails = APPOINTMENT_SCHEDULED_TEMPLATE.replace(
            '{{name}}',
            data.name,
        )
            .replace('{{date}}', new Date(data.date).toLocaleString())
            .replace('{{doctor}}', data.doctor)
            .replace('{{clinic}}', data.clinic)
            .replace('{{address}}', data.address)
            .replace('{{countryCode}}', data.countryCode)
            .replace('{{phone}}', data.phone);

        const msg = {
            to: data.email,
            from: fromEmail, // This should be a verified sender in SendGrid
            subject: 'Your Appointment Scheduled',
            text: `Your appointment is scheduled for ${new Date(
                data.date,
            ).toLocaleString()}`, // Fallback text version
            html: htmlWithDetails,
        };
        return this.sendEmail(msg);
    }

    async sendVerificationCode(data: IUserCode) {
        const fromEmail = this.configService.get<string>('SENDGRID_FROM_EMAIL');
        const htmlWithCode = VERIFICATION_EMAIL_TEMPLATE.replace(
            '{{verificationCode}}',
            data.code,
        );
        const msg = {
            to: data.email,
            from: fromEmail, // This should be a verified sender in SendGrid
            subject: 'Your Verification Code',
            text: `Your verification code is: ${data.code}`, // Fallback text version
            html: htmlWithCode,
        };
        return this.sendEmail(msg);
    }

    private async sendEmail(msg: any) {
        try {
            await sgMail.send(msg);
            this.commonUtilsService.colorLogger({
                type: 'debug',
                message: `Email sent successfully to ${msg.to}`,
                context: 'NotificationService',
            });
        } catch (error) {
            this.logger.error(
                `Error sending email: ${error.message}`,
                error.stack,
            );
            if (error.response) {
                this.logger.error(
                    `Error response: ${JSON.stringify(error.response.body)}`,
                );
            }
        }
    }
}
