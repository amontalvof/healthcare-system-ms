import { Request, Response } from 'express';
import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { BillingService } from './billing.service';
import { AppointmentPaymentSessionDto } from './dtos/appointment-payment-session.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { ERole } from '@app/common-utils/jwt/user';
import { Roles } from '../../decorators/roles.decorator';

@Controller('billing')
export class BillingController {
    constructor(private readonly billingService: BillingService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ERole.Admin, ERole.Doctor, ERole.Patient)
    @Post('create-payment-session')
    createPaymentSession(
        @Body() appointmentPaymentSessionDto: AppointmentPaymentSessionDto,
    ) {
        return this.billingService.createPaymentSession(
            appointmentPaymentSessionDto,
        );
    }

    @Post('stripe-webhook')
    async webhook(@Req() req: Request, @Res() res: Response) {
        return this.billingService.webhook(req, res);
    }

    @Post('charge-succeeded')
    succeeded(@Req() req: Request, @Res() res: Response) {
        res.status(200).json({ message: 'Payment successful' });
    }

    @Post('charge-failed')
    failed(@Req() req: Request, @Res() res: Response) {
        res.status(400).json({ message: 'Payment failed' });
    }
}
