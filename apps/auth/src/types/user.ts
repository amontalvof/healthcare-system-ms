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
