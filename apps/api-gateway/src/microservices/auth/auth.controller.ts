import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RegisterResponseDto } from './response/register-response.dto';
import { LoginResponseDto } from './response/login-response.dto';
import { VerifyDto } from './dtos/verify.dto';
import { VerifyResponseDto } from './response/verify-response.dto';
import { ResendVerificationDto } from './dtos/resend-verification.dto';
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

    @ApiOkResponse({
        description: 'User verified successfully',
        type: VerifyResponseDto,
    })
    @Post('verify')
    async verify(@Body() verifyDto: VerifyDto) {
        return this.authService.verifyUser(verifyDto);
    }

    @ApiOkResponse({
        description: 'Verification code resent successfully',
        type: VerifyResponseDto,
    })
    @Post('resend-verification')
    async resendVerification(
        @Body() resendVerificationDto: ResendVerificationDto,
    ) {
        return this.authService.resendVerification(resendVerificationDto);
    }
}
