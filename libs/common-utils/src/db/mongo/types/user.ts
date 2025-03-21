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

export enum EUserRole {
    ADMIN = 'admin',
    PATIENT = 'patient',
    DOCTOR = 'doctor',
}
