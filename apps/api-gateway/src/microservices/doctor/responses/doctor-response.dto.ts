import { ApiProperty } from '@nestjs/swagger';

export class DoctorResponseDto {
    @ApiProperty({
        description: 'Unique identifier of the doctor',
        example: 8,
    })
    id: number;

    @ApiProperty({
        description: 'Full name of the doctor',
        example: 'John Doe',
    })
    fullName: string;

    @ApiProperty({
        description: 'Email address of the doctor',
        example: 'john@mail.com',
    })
    email: string;

    @ApiProperty({
        description: 'User uuid of the doctor',
        example: 'c4e0b4f0-4e5b-4f9b-9b1e-9f4b5b4e0b4f',
    })
    userId: string;

    @ApiProperty({
        description: 'Specialty of the doctor',
        example: 'Neurologist',
    })
    specialty: string;

    @ApiProperty({
        description: 'Clinic name of the doctor',
        example: 'Doe Clinic',
    })
    clinic: string;

    @ApiProperty({
        description: 'Clinic address of the doctor',
        example: '123 Doe St.',
    })
    clinicAddress: string;

    @ApiProperty({
        description: 'Country code of the doctor',
        example: '+1',
    })
    countryCode: string;

    @ApiProperty({
        description: 'Phone number of the doctor',
        example: '1234567890',
    })
    phone: string;

    @ApiProperty({
        description: 'Date when the doctor was created',
        example: '2021-10-01T00:00:00.000Z',
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Date when the doctor was last updated',
        example: '2021-10-01T00:00:00.000Z',
    })
    updatedAt: Date;
}
