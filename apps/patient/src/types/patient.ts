import { AddressInput } from '@app/common-utils/db/postgres/types/address';
import { ESex } from '@app/common-utils/db/postgres/types/patient';

export interface ICreatePatientDto {
    fullName: string;
    email: string;
    userId: string;
    countryCode: string;
    phone: string;
    insuranceId: number;
    address: AddressInput;
    birthDate: string; // Format: YYYY-MM-DD
    sex: ESex;
    emergencyContact: {
        fullName: string;
        countryCode: string;
        phone: string;
    };
}

export interface IUpdatePatientDto
    extends Omit<Partial<ICreatePatientDto>, 'userId' | 'email'> {}
