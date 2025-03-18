import { CommonUtilsService } from '@app/common-utils';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const sgMail = require('@sendgrid/mail');
import { VERIFICATION_EMAIL_TEMPLATE } from './templates/verification-email';

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
    handleTestEvent(data: any): string {
        return 'Sent event to RabbitMQ!';
    }

    async sendVerificationCode(data: { email: string; code: string }) {
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
        try {
            await sgMail.send(msg);
            this.commonUtilsService.colorLogger({
                type: 'debug',
                message: `Verification email sent successfully to ${data.email}`,
                context: 'NotificationService',
            });
        } catch (error) {
            this.logger.error(
                `Error sending verification email: ${error.message}`,
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
