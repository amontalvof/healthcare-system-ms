import { ApiProperty } from '@nestjs/swagger';

export class BookedHoursResponseDto {
    @ApiProperty({
        description: 'The start time of the booked hours',
        example: '10:00:00',
    })
    startTime: string;

    @ApiProperty({
        description: 'The end time of the booked hours',
        example: '11:00:00',
    })
    endTime: string;
}
