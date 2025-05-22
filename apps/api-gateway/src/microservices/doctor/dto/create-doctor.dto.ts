import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsEmail,
    IsString,
    IsOptional,
    IsNumber,
    IsInt,
    IsArray,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AddressInputDto } from '@app/common-utils/api/address-input.dto';

export class CreateDoctorDto {
    @ApiProperty({ description: 'Full name of the doctor' })
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @ApiProperty({ description: 'Email of the doctor' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'User ID of the doctor' })
    @IsNotEmpty()
    @IsString()
    userId: string;

    @ApiProperty({
        description: 'Profile image URL of the doctor',
        required: false,
    })
    @IsOptional()
    @IsString()
    imageUrl?: string;

    @ApiProperty({ description: 'Medical degree of the doctor' })
    @IsNotEmpty()
    @IsString()
    degree: string;

    @ApiProperty({ description: 'Years of experience' })
    @IsNotEmpty()
    @IsString()
    experience: string;

    @ApiProperty({ description: 'About section', required: false })
    @IsOptional()
    @IsString()
    about?: string;

    @ApiProperty({ description: 'Consultation fees' })
    @IsNotEmpty()
    @IsNumber()
    fees: number;

    @ApiProperty({ description: 'Hospital or clinic name' })
    @IsNotEmpty()
    @IsString()
    hospital: string;

    @ApiProperty({ description: 'Address of the hospital' })
    @ValidateNested()
    @Type(() => AddressInputDto)
    address: AddressInputDto;

    @ApiProperty({ description: 'Country code for phone' })
    @IsNotEmpty()
    @IsString()
    countryCode: string;

    @ApiProperty({ description: 'Contact phone number' })
    @IsNotEmpty()
    @IsString()
    phone: string;

    @ApiProperty({ description: 'Work start time (HH:MM)', required: false })
    @IsOptional()
    @IsString()
    workStart?: string;

    @ApiProperty({ description: 'Work end time (HH:MM)', required: false })
    @IsOptional()
    @IsString()
    workEnd?: string;

    @ApiProperty({ description: 'Specialty ID' })
    @IsNotEmpty()
    @IsInt()
    specialtyId: number;

    @ApiProperty({
        description: 'List of insurance IDs',
        required: false,
        isArray: true,
        type: Number,
    })
    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    insuranceIds?: number[];
}
