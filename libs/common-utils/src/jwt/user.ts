export interface IJwtUser {
    email: string;
    userId: string;
    roles: ERole[];
}

export enum ERole {
    Doctor = 'doctor',
    Patient = 'patient',
    Admin = 'admin',
}
