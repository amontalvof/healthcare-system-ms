import { AddressInput } from '@app/common-utils/db/postgres/types/address';

export interface ICreatePatientDto {
    fullName: string;
    email: string;
    userId: string;
    countryCode: string;
    phone: string;
    insuranceId: number;
    address: AddressInput;
    emergencyContact: {
        fullName: string;
        countryCode: string;
        phone: string;
    };
}

export interface IUpdatePatientDto
    extends Omit<Partial<ICreatePatientDto>, 'userId' | 'email'> {}
