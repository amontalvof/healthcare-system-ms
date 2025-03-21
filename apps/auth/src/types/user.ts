import { EUserRole } from '@app/common-utils/db/mongo/types/user';

export interface IRegisterUserDto {
    email: string;
    password: string;
    fullName: string;
    role: EUserRole;
}

export interface ILoginUserDto {
    email: string;
    password: string;
}

export interface IVerifyDto {
    email: string;
    code: string;
}

export interface IResendVerificationDto {
    email: string;
}
