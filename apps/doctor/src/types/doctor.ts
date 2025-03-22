export interface ICreateDoctorDto {
    fullName: string;
    email: string;
    userId: string;
    specialty: string;
    clinic: string;
    clinicAddress: string;
    countryCode: string;
    phone: string;
}

export interface IUpdateDoctorDto extends Partial<ICreateDoctorDto> {}
