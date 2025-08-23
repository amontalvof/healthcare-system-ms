import { CommonUtilsService } from '@app/common-utils';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TransactionalEmailsApi, SendSmtpEmail } from '@getbrevo/brevo';
import { VERIFICATION_EMAIL_TEMPLATE } from './templates/verification-email';
import { IUserCode } from './types/user';
import { IAppointment } from './types/appointment';
import { APPOINTMENT_SCHEDULED_TEMPLATE } from './templates/scheduled-appointment';

@Injectable()
export class NotificationService {
    private readonly logger = new Logger(NotificationService.name);
    private emailAPI: TransactionalEmailsApi;
    constructor(
        private readonly configService: ConfigService,
        private readonly commonUtilsService: CommonUtilsService,
    ) {
        this.emailAPI = new TransactionalEmailsApi();
        this.emailAPI.setApiKey(
            0, // Corresponds to the 'apiKey' authentication method
            this.configService.get<string>('BREVO_API_KEY'),
        );
    }
    sendAppointmentScheduled(data: IAppointment) {
        const fromEmail = this.configService.get<string>('BREVO_FROM_EMAIL');
        const htmlWithDetails = APPOINTMENT_SCHEDULED_TEMPLATE.replace(
            '{{name}}',
            data.name,
        )
            .replace('{{date}}', new Date(data.date).toLocaleString())
            .replace('{{doctor}}', data.doctor)
            .replace('{{hospital}}', data.hospital)
            .replace('{{address}}', data.address)
            .replace('{{countryCode}}', data.countryCode)
            .replace('{{phone}}', data.phone);

        let message = new SendSmtpEmail();
        message.subject = 'Your Appointment Scheduled';
        message.textContent = `Your appointment is scheduled for ${new Date(
            data.date,
        ).toLocaleString()}`;
        message.htmlContent = htmlWithDetails;
        message.sender = {
            name: 'Healthcare System',
            email: fromEmail,
        };
        message.to = [{ email: data.email, name: data.name }];
        return this.sendEmail(message);
    }

    async sendVerificationCode(data: IUserCode) {
        const fromEmail = this.configService.get<string>('BREVO_FROM_EMAIL');
        const htmlWithCode = VERIFICATION_EMAIL_TEMPLATE.replace(
            '{{verificationCode}}',
            data.code,
        );

        let message = new SendSmtpEmail();
        message.subject = 'Your Verification Code';
        message.textContent = `Your verification code is: ${data.code}`;
        message.htmlContent = htmlWithCode;
        message.sender = {
            name: 'Healthcare System',
            email: fromEmail,
        };
        message.to = [{ email: data.email, name: data.name }];
        return this.sendEmail(message);
    }

    private async sendEmail(msg: any) {
        try {
            await this.emailAPI.sendTransacEmail(msg);
            this.commonUtilsService.colorLogger({
                type: 'debug',
                message: `Email sent successfully to ${msg.to[0].email}`,
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
