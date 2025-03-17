export interface IUser {
    _id?: string;
    email: string;
    password: string;
    fullName: string;
    isActive: boolean;
    roles: string[];
    verificationCode: string;
    verificationCodeExpires: Date;
    createdAt: Date;
    updatedAt: Date;
}

export enum UserRole {
    ADMIN = 'admin',
    PATIENT = 'patient',
    DOCTOR = 'doctor',
}

export interface IRegisterUserDto {
    email: string;
    password: string;
    fullName: string;
    role: UserRole;
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
