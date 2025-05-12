export interface ICreateDoctorDto {
    fullName: string;
    email: string;
    userId: string;
    imageUrl?: string;
    specialty: string;
    degree: string;
    experience: string;
    about?: string;
    fees: number;
    clinic: string;
    address: string;
    countryCode: string;
    phone: string;
}

export interface IUpdateDoctorDto extends Partial<ICreateDoctorDto> {}
