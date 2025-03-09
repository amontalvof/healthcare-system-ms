import { QUEUE_CLIENT_NAMES } from '@app/common-utils';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { LoginUserDto } from './dtos/login.dto';
import { RegisterUserDto } from './dtos/register-user.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject(QUEUE_CLIENT_NAMES.AUTH_RMQ_CLIENT)
        private readonly authClient: ClientProxy,
    ) {}

    register(registerUserDto: RegisterUserDto) {
        return lastValueFrom(
            this.authClient.send({ cmd: 'register.user' }, registerUserDto),
        );
    }

    login(loginUserDto: LoginUserDto) {
        return lastValueFrom(
            this.authClient.send({ cmd: 'login.user' }, loginUserDto),
        );
    }
}
