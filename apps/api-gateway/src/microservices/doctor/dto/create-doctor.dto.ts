import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateDoctorDto {
    @ApiProperty({ description: 'Full name of the doctor' })
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @ApiProperty({ description: 'Email of the doctor' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Specialty of the doctor' })
    @IsNotEmpty()
    @IsString()
    specialty: string;

    @ApiProperty({ description: 'Clinic of the doctor' })
    @IsNotEmpty()
    @IsString()
    clinic: string;

    @ApiProperty({ description: 'Clinic address of the doctor' })
    @IsNotEmpty()
    @IsString()
    clinicAddress: string;

    @ApiProperty({ description: 'Country code of the doctor' })
    @IsNotEmpty()
    @IsString()
    countryCode: string;

    @ApiProperty({ description: 'Phone number of the doctor' })
    @IsNotEmpty()
    @IsString()
    phone: string;
}
