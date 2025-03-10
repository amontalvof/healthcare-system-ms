export interface ICreatePatientDto {
    fullName: string;
    email: string;
    countryCode: string;
    phone: string;
    address: string;
    emergencyContact: {
        fullName: string;
        countryCode: string;
        phone: string;
    };
}

export interface IUpdatePatientDto extends Partial<ICreatePatientDto> {}
