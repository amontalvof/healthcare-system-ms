import { ApiProperty } from '@nestjs/swagger';

export class InsuranceResponseDto {
    @ApiProperty({
        description: 'Unique identifier of the insurance',
        example: 1,
    })
    id: number;

    @ApiProperty({
        description: 'Name of the insurance provider',
        example: 'Health Insurance Co.',
    })
    name: string;

    @ApiProperty({
        description: 'Creation date of the insurance record',
        example: '2025-03-10T19:12:46.542Z',
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Last update date of the insurance record',
        example: '2025-03-10T19:12:46.542Z',
    })
    updatedAt: Date;

    @ApiProperty({
        description:
            'Deletion date of the patient insurance, null if not deleted',
        example: null,
    })
    deletedAt: Date | null;
}
