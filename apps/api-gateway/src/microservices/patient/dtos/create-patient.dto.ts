import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

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
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Country code of the patient' })
    @IsNotEmpty()
    @IsString()
    countryCode: string;

    @ApiProperty({ description: 'Phone number of the patient' })
    @IsNotEmpty()
    @IsString()
    phone: string;

    @ApiProperty({ description: 'Address of the patient' })
    @IsNotEmpty()
    @IsString()
    address: string;

    @ApiProperty({
        description: 'Emergency contact details',
        type: EmergencyContactDto,
    })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => EmergencyContactDto)
    emergencyContact: EmergencyContactDto;
}
