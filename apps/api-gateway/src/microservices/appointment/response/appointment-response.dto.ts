import { ApiProperty } from '@nestjs/swagger';

export class AppointmentResponseDto {
    @ApiProperty({
        description: 'The unique identifier of the appointment',
        example: 18,
    })
    id: number;

    @ApiProperty({
        description: 'The unique identifier of the patient',
        example: 9,
    })
    patientId: number;

    @ApiProperty({
        description: 'The unique identifier of the doctor',
        example: 2,
    })
    doctorId: number;

    @ApiProperty({
        description: 'The appointment date and time',
        example: '2024-09-15T12:55:23.000Z',
    })
    date: Date;

    @ApiProperty({
        description: 'The reason for the appointment',
        example: 'Lorem Ipsum dolor',
    })
    reason: string;

    @ApiProperty({
        description: 'The reason for cancellation, if any',
        example: null,
        nullable: true,
    })
    cancelledReason: string | null;

    @ApiProperty({
        description: 'The current status of the appointment',
        example: 'SCHEDULED',
    })
    status: string;

    @ApiProperty({
        description: 'The creation date of the appointment',
        example: '2025-03-10T19:21:33.220Z',
    })
    createdAt: Date;

    @ApiProperty({
        description: 'The last updated date of the appointment',
        example: '2025-03-10T19:21:33.220Z',
    })
    updatedAt: Date;
}
