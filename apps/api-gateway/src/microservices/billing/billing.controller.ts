import { Request, Response } from 'express';
import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { BillingService } from './billing.service';
import { AppointmentPaymentSessionDto } from './dtos/appointment-payment-session.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { ERole, IJwtUser } from '@app/common-utils/jwt/user';
import { Roles } from '../../decorators/roles.decorator';
import { User } from '../../decorators/user.decorator';
import { RefundPaymentDto } from './dtos/refund-payment.dto';

@Controller('billing')
export class BillingController {
    constructor(private readonly billingService: BillingService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ERole.Admin, ERole.Doctor, ERole.Patient)
    @Post('create-payment-session')
    createPaymentSession(
        @User() user: IJwtUser,
        @Body() appointmentPaymentSessionDto: AppointmentPaymentSessionDto,
    ) {
        return this.billingService.createPaymentSession(
            user,
            appointmentPaymentSessionDto,
        );
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ERole.Admin, ERole.Doctor, ERole.Patient)
    @Post('refund')
    refund(
        @User() user: IJwtUser,
        @Body()
        refundPaymentDto: RefundPaymentDto,
    ) {
        return this.billingService.refundPayment(user, refundPaymentDto);
    }

    @Post('stripe-webhook')
    async webhook(@Req() req: Request, @Res() res: Response) {
        return this.billingService.webhook(req, res);
    }
}
