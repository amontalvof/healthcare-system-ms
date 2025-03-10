export interface IJwtUser {
    email: string;
    userId: string;
    roles: Role[];
}

export enum Role {
    Doctor = 'doctor',
    Patient = 'patient',
    Admin = 'admin',
}
