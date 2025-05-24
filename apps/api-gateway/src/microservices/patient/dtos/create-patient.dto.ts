import { AddressInputDto } from '@app/common-utils/api/address-input.dto';
import { ESex } from '@app/common-utils/db/postgres/types/patient';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsEmail,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    ValidateNested,
} from 'class-validator';

export class EmergencyContactDto {
    @ApiProperty({ description: 'Name of the emergency contact' })
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @ApiProperty({ description: 'Country code of the emergency contact' })
    @IsNotEmpty()
    @IsString()
    countryCode: string;

    @ApiProperty({ description: 'Phone number of the emergency contact' })
    @IsNotEmpty()
    @IsString()
    phone: string;
}

export class CreatePatientDto {
    @ApiProperty({ description: 'Full name of the patient' })
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @ApiProperty({ description: 'Email of the patient' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'User ID of the patient' })
    @IsNotEmpty()
    @IsString()
    userId: string;

    @ApiProperty({
        description: 'Profile image URL of the patient',
        required: false,
    })
    @IsOptional()
    @IsString()
    imageUrl?: string;

    @ApiProperty({ description: 'Country code of the patient' })
    @IsNotEmpty()
    @IsString()
    countryCode: string;

    @ApiProperty({ description: 'Phone number of the patient' })
    @IsNotEmpty()
    @IsString()
    phone: string;

    @ApiProperty({ description: 'Insurance ID' })
    @IsNotEmpty()
    @IsInt()
    insuranceId: number;

    @ApiProperty({ description: 'Address of the patient' })
    @ValidateNested()
    @Type(() => AddressInputDto)
    address: AddressInputDto;

    @ApiProperty({
        description: 'Date of birth of the patient (YYYY-MM-DD)',
        type: String,
        format: 'date',
    })
    @IsNotEmpty()
    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'birthDate must be in YYYY-MM-DD format',
    })
    birthDate: string;

    @ApiProperty({
        description: 'Sex of the patient',
        enum: ESex,
    })
    @IsNotEmpty()
    @IsEnum(ESex, {
        message: `sex must be one of: ${Object.values(ESex).join(', ')}`,
    })
    sex: ESex;

    @ApiProperty({
        description: 'Emergency contact details',
        type: EmergencyContactDto,
    })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => EmergencyContactDto)
    emergencyContact: EmergencyContactDto;
}
