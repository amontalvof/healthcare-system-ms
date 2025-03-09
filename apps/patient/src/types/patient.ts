export interface ICreatePatientDto {
    fullName: string;
    email: string;
    countryCode: string;
    phone: string;
    address: string;
    emergencyContactName: string;
    emergencyContactCountryCode: string;
    emergencyContactPhone: string;
}

export interface IUpdatePatientDto extends Partial<ICreatePatientDto> {}
