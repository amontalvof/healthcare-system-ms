import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { QUEUE_CLIENT_NAMES } from '@app/common-utils';
import {
    ILoginUserDto,
    IRegisterUserDto,
    IResendVerificationDto,
    IVerifyDto,
} from './types/user';
import { randomInt } from 'crypto';
import dayjs from 'dayjs';

@Injectable()
export class AuthService {
    constructor(
        @Inject(QUEUE_CLIENT_NAMES.NOTIFICATION_RMQ_CLIENT)
        private readonly notificationClient: ClientProxy,
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        private readonly jwtService: JwtService,
    ) {}

    async register(createUserDto: IRegisterUserDto) {
        const { fullName, email, role, password = '' } = createUserDto;
        // Check if user already exists
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            return {
                ok: false,
                exception: 'ConflictException',
                message: 'User with this email already exists.',
            };
        }
        const code = this.generateCode();
        const expires = dayjs().add(15, 'minute').toDate();
        // Hash the password securely
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = new this.userModel({
            fullName,
            email,
            roles: [role],
            password: hashedPassword,
            verificationCode: code,
            verificationCodeExpires: expires,
        });
        this.notificationClient.emit('send.verification.code', {
            code,
            email,
        });
        return user.save();
    }

    async login(loginDto: ILoginUserDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            return {
                ok: false,
                exception: 'UnauthorizedException',
                message: 'Invalid credentials',
            };
        }
        if (!user.isActive) {
            return {
                ok: false,
                exception: 'UnauthorizedException',
                message: 'User is not verified',
            };
        }
        const payload = { sub: user._id, email: user.email, roles: user.roles };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async verifyUser(verifyDto: IVerifyDto) {
        const { email, code } = verifyDto;
        const user = await this.userModel.findOne({
            email,
            verificationCode: code,
        });

        if (!user) {
            return {
                ok: false,
                exception: 'BadRequestException',
                message: 'Invalid verification code or email',
            };
        }

        if (dayjs(user.verificationCodeExpires).isBefore(dayjs())) {
            return {
                ok: false,
                exception: 'BadRequestException',
                message: 'Verification code has expired',
            };
        }

        user.isActive = true;
        user.verificationCode = null;
        user.verificationCodeExpires = null;

        await user.save();

        return { ok: true, message: 'User verified successfully' };
    }

    async resendVerification(resendVerificationDto: IResendVerificationDto) {
        const { email } = resendVerificationDto;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            return {
                ok: false,
                exception: 'BadRequestException',
                message: 'User not found',
            };
        }
        if (user.isActive) {
            return {
                ok: false,
                exception: 'BadRequestException',
                message: 'User is already verified',
            };
        }
        if (dayjs(user.verificationCodeExpires).isAfter(dayjs())) {
            return {
                ok: false,
                exception: 'BadRequestException',
                message: 'Verification code is still valid',
            };
        }
        const code = this.generateCode();
        const expires = dayjs().add(15, 'minute').toDate();
        user.verificationCode = code;
        user.verificationCodeExpires = expires;
        await user.save();
        this.notificationClient.emit('send.verification.code', {
            code,
            email,
        });
        return { ok: true, message: 'Verification code resent successfully' };
    }

    private async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userModel.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        return null;
    }

    private generateCode(): string {
        return randomInt(100000, 1000000).toString();
    }
}
