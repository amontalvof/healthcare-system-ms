import { AddressInputDto } from '@app/common-utils/api/address-input.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsEmail,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
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
        description: 'Emergency contact details',
        type: EmergencyContactDto,
    })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => EmergencyContactDto)
    emergencyContact: EmergencyContactDto;
}
