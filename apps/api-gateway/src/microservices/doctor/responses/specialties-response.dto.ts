import { ApiProperty } from '@nestjs/swagger';

export class SpecialtiesResponseDto {
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
        description: 'Image URL of the specialty',
        example: 'https://example.com/images/cardiology.svg',
        type: String,
    })
    image: string;

    @ApiProperty({
        description: 'Date when the specialty was created',
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
