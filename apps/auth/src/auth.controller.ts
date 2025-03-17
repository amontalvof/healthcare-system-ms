import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import {
    ILoginUserDto,
    IRegisterUserDto,
    IResendVerificationDto,
    IVerifyDto,
} from './types/user';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @MessagePattern({ cmd: 'register.user' })
    register(registerUserDto: IRegisterUserDto) {
        return this.authService.register(registerUserDto);
    }

    @MessagePattern({ cmd: 'login.user' })
    login(loginUserDto: ILoginUserDto) {
        return this.authService.login(loginUserDto);
    }

    @MessagePattern({ cmd: 'verify.code' })
    async verify(verifyDto: IVerifyDto) {
        return this.authService.verifyUser(verifyDto);
    }

    @MessagePattern({ cmd: 'resend.verification.code' })
    async resendVerification(resendVerificationDto: IResendVerificationDto) {
        return this.authService.resendVerification(resendVerificationDto);
    }
}
