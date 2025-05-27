import { AddressInputDto } from '@app/common-utils/api/address-input.dto';
import { InsuranceResponseDto } from '@app/common-utils/api/Insurance-response-dto';
import { ApiProperty } from '@nestjs/swagger';

export class SpecialtyResponseDto {
    @ApiProperty({
        description: 'Unique identifier of the specialty',
        example: 1,
    })
    id: number;

    @ApiProperty({
        description: 'Name of the specialty',
        example: 'Cardiology',
    })
    name: string;

    @ApiProperty({
        description: 'Slug of the specialty',
        example: 'cardiology',
    })
    route: string;

    @ApiProperty({
        description: ' Image URL of the specialty',
        example: 'https://example.com/images/cardiology.jpg',
        type: String,
    })
    image: string;

    @ApiProperty({
        description: ' Date when the specialty was created',
        example: '2021-10-10T00:00:00.000Z',
        type: Date,
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Date when the specialty was last updated',
        example: '2021-10-10T00:00:00.000Z',
        type: Date,
    })
    updatedAt: Date;

    @ApiProperty({
        description: 'Date when the specialty was deleted',
        nullable: true,
        type: Date,
        example: null,
    })
    deletedAt: Date;
}

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
        description: 'Image URL of the doctor',
        example: 'https://example.com/images/john-doe.jpg',
        nullable: true,
        type: String,
    })
    imageUrl?: string;

    @ApiProperty({
        description: 'Degree of the doctor',
        example: 'MD',
    })
    degree: string;

    @ApiProperty({
        description: 'Years of experience of the doctor',
        example: '10 years',
    })
    experience: string;

    @ApiProperty({
        description: 'About the doctor',
        example: 'Experienced neurologist with a passion for patient care.',
    })
    about: string;

    @ApiProperty({
        description: 'Fees charged by the doctor',
        example: 150,
    })
    fees: number;

    @ApiProperty({
        description: 'Hospital where the doctor works',
        example: 'City Hospital',
    })
    hospital: string;

    @ApiProperty({
        description: 'Work start time of the doctor',
        example: '09:00:00',
    })
    workStart: string;

    @ApiProperty({
        description: 'Work end time of the doctor',
        example: '17:00:00',
    })
    workEnd: string;

    @ApiProperty({
        description: 'Address of the hospital where the doctor works',
        type: AddressInputDto,
    })
    hospitalAddress: AddressInputDto;

    @ApiProperty({
        description: 'Specialty of the doctor',
        type: SpecialtyResponseDto,
    })
    specialty: SpecialtyResponseDto;

    @ApiProperty({
        description: 'List of insurances accepted by the doctor',
        type: [InsuranceResponseDto],
    })
    insurancesList: InsuranceResponseDto[];

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

    @ApiProperty({
        description: 'Date when the doctor was deleted',
        nullable: true,
        type: Date,
        example: null,
    })
    deletedAt: Date;
}
