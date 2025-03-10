import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RegisterResponseDto } from './response/register-response.dto';
import { LoginResponseDto } from './response/login-response.dto';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOkResponse({
        description: 'User registered successfully',
        type: RegisterResponseDto,
    })
    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.register(registerUserDto);
    }

    @ApiOkResponse({
        description: 'User logged in successfully',
        type: LoginResponseDto,
    })
    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }
}
