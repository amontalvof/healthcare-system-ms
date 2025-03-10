import { ApiProperty } from '@nestjs/swagger';

export class EmergencyContactResponseDto {
    @ApiProperty({ description: 'Phone number of the emergency contact' })
    phone: string;

    @ApiProperty({ description: 'Full name of the emergency contact' })
    fullName: string;

    @ApiProperty({ description: 'Country code of the emergency contact' })
    countryCode: string;
}

export class PatientResponseDto {
    @ApiProperty({
        description: 'Unique identifier of the patient',
        example: 8,
    })
    id: number;

    @ApiProperty({
        description: 'Full name of the patient',
        example: 'Jane Doe',
    })
    fullName: string;

    @ApiProperty({
        description: 'Email address of the patient',
        example: 'Jane@mail.com',
    })
    email: string;

    @ApiProperty({
        description: 'User identifier (UUID) for the patient',
        example: 'aa6226e9-b305-4b3f-b933-7fbd4e53643e',
    })
    userId: string;

    @ApiProperty({ description: 'Country code of the patient', example: 'US' })
    countryCode: string;

    @ApiProperty({
        description: 'Phone number of the patient',
        example: '1234567890',
    })
    phone: string;

    @ApiProperty({
        description: 'Address of the patient',
        example: 'Lorem Ipsum Dolor',
    })
    address: string;

    @ApiProperty({
        description: 'Emergency contact information',
        type: EmergencyContactResponseDto,
    })
    emergencyContact: EmergencyContactResponseDto;

    @ApiProperty({
        description: 'Creation date of the patient record',
        example: '2025-03-10T19:12:46.542Z',
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Last update date of the patient record',
        example: '2025-03-10T19:12:46.542Z',
    })
    updatedAt: Date;
}
