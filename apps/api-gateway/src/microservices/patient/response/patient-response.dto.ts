import { AddressInputDto } from '@app/common-utils/api/address-input.dto';
import { InsuranceResponseDto } from '@app/common-utils/api/Insurance-response-dto';
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

    @ApiProperty({
        description: 'Image URL of the patient',
        example: 'https://example.com/image.jpg',
    })
    imageUrl: string;

    @ApiProperty({
        description: 'Sex of the patient',
        example: 'male',
    })
    sex: string;

    @ApiProperty({
        description: 'Birth date of the patient',
        example: '1990-01-01',
    })
    birthDate: string;

    @ApiProperty({ description: 'Country code of the patient', example: 'US' })
    countryCode: string;

    @ApiProperty({
        description: 'Phone number of the patient',
        example: '1234567890',
    })
    phone: string;

    @ApiProperty({
        description: 'Address of the patient',
        type: AddressInputDto,
    })
    address: AddressInputDto;

    @ApiProperty({
        description: 'Emergency contact information',
        type: EmergencyContactResponseDto,
    })
    emergencyContact: EmergencyContactResponseDto;

    @ApiProperty({
        description: 'Insurance information of the patient',
        type: InsuranceResponseDto,
    })
    insurance: InsuranceResponseDto;

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

    @ApiProperty({
        description: 'Deletion date of the patient record, null if not deleted',
        example: null,
    })
    deletedAt: Date | null;
}
