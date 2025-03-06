import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreatePatientDto {
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    countryCode: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    emergencyContactName: string;

    @IsNotEmpty()
    @IsString()
    emergencyContactCountryCode: string;

    @IsNotEmpty()
    @IsString()
    emergencyContactPhone: string;
}
