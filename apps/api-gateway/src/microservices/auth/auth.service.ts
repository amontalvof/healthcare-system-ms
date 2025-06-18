import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { LoginUserDto } from './dtos/login.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
import { VerifyDto } from './dtos/verify.dto';
import { ResendVerificationDto } from './dtos/resend-verification.dto';
import { exceptionHandler } from '../../errors/exceptions';
import { QUEUE_CLIENT_NAMES } from '@app/common-utils/queues/constants';

@Injectable()
export class AuthService {
    constructor(
        @Inject(QUEUE_CLIENT_NAMES.AUTH_RMQ_CLIENT)
        private readonly authClient: ClientProxy,
    ) {}

    async register(registerUserDto: RegisterUserDto) {
        const result = await lastValueFrom(
            this.authClient.send({ cmd: 'register.user' }, registerUserDto),
        );
        return exceptionHandler(result);
    }

    async login(loginUserDto: LoginUserDto) {
        const result = await lastValueFrom(
            this.authClient.send({ cmd: 'login.user' }, loginUserDto),
        );
        return exceptionHandler(result);
    }

    async verifyUser(verifyDto: VerifyDto) {
        const result = await lastValueFrom(
            this.authClient.send({ cmd: 'verify.code' }, verifyDto),
        );
        return exceptionHandler(result);
    }

    async resendVerification(resendVerificationDto: ResendVerificationDto) {
        const result = await lastValueFrom(
            this.authClient.send(
                { cmd: 'resend.verification.code' },
                resendVerificationDto,
            ),
        );
        return exceptionHandler(result);
    }

    async populateUsers() {
        const result = await lastValueFrom(
            this.authClient.send({ cmd: 'populate.users' }, {}),
        );
        return exceptionHandler(result);
    }
}
