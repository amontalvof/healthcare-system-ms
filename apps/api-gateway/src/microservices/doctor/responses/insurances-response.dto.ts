import { ApiProperty } from '@nestjs/swagger';

export class InsurancesResponseDto {
    @ApiProperty({
        description: 'Unique identifier of the specialty',
        example: 1,
    })
    id: number;

    @ApiProperty({
        description: 'Name of the insurance',
        example: 'Health Insurance Co.',
    })
    name: string;
}
