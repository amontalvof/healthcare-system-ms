export interface IUser {
    _id?: string;
    email: string;
    password: string;
    fullName: string;
    isActive: boolean;
    roles: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface IRegisterUserDto {
    email: string;
    password: string;
    fullName: string;
}

export interface ILoginUserDto {
    email: string;
    password: string;
}
