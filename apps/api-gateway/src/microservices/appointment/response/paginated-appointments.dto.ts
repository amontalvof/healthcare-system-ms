import { ApiProperty } from '@nestjs/swagger';
import { AppointmentResponseDto } from './appointment-response.dto';

export class PaginatedAppointmentsDto {
    @ApiProperty({ description: 'Total number of appointments', example: 7 })
    total: number;

    @ApiProperty({ description: 'Current page number', example: 2 })
    page: number;

    @ApiProperty({ description: 'Number of appointments per page', example: 2 })
    limit: number;

    @ApiProperty({
        description: 'List of appointments',
        type: [AppointmentResponseDto],
    })
    data: AppointmentResponseDto[];

    @ApiProperty({ description: 'Total number of pages', example: 4 })
    totalPages: number;
}
