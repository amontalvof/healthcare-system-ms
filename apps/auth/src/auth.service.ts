import {
    ConflictException,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { QUEUE_CLIENT_NAMES } from '@app/common-utils';
import { ILoginUserDto, IRegisterUserDto, IUserResponse } from './types/user';

@Injectable()
export class AuthService {
    constructor(
        @Inject(QUEUE_CLIENT_NAMES.NOTIFICATION_RMQ_CLIENT)
        private readonly notificationClient: ClientProxy,
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        private readonly jwtService: JwtService,
    ) {}

    async register(createUserDto: IRegisterUserDto): Promise<IUserResponse> {
        const { fullName, email, password = '' } = createUserDto;
        // Check if user already exists
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new ConflictException('User with this email already exists.');
        }
        // Hash the password securely
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = new this.userModel({
            fullName,
            email,
            password: hashedPassword,
        });
        // TODO: Send real verification code to user
        this.notificationClient.emit('send.verification.code', {
            code: 'abc1234',
            email,
        });
        const savedUser = await user.save();
        const { password: _, ...userWithoutPassword } = savedUser.toObject();
        return userWithoutPassword as IUserResponse;
    }

    async login(loginDto: ILoginUserDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user._id, email: user.email, roles: user.roles };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    private async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userModel.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        return null;
    }
}
