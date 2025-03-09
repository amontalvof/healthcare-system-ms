import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { ILoginUserDto, IRegisterUserDto } from './types/user';

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
}
