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
        example: '2024-09-15',
    })
    date: string;

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
        description: ' The start time of the appointment',
        example: '10:00:00',
    })
    startTime: string;

    @ApiProperty({
        description: ' The end time of the appointment',
        example: '11:00:00',
    })
    endTime: string;

    @ApiProperty({
        description: 'Indicates if the appointment has been paid',
    })
    isPaid: boolean;

    @ApiProperty({
        description: 'The payment ID if the appointment has been paid',
        example: null,
        nullable: true,
    })
    paymentId: string | null;

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

    @ApiProperty({
        description: 'The deletion date of the appointment, if deleted',
        example: null,
        nullable: true,
    })
    deletedAt: Date;
}
