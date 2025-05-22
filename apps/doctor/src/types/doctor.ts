import { AddressInput } from '@app/common-utils/db/postgres/types/address';

export interface ICreateDoctorDto {
    fullName: string;
    email: string;
    userId: string;
    imageUrl?: string;
    degree: string;
    experience: string;
    about?: string;
    fees: number;
    hospital: string;
    countryCode: string;
    phone: string;
    workStart?: string;
    workEnd?: string;
    specialtyId: number;
    insuranceIds?: number[];
    address: AddressInput;
}

export interface IUpdateDoctorDto
    extends Omit<Partial<ICreateDoctorDto>, 'userId' | 'email'> {}
