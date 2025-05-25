import { EAppointmentStatus } from '@app/common-utils/db/postgres/types/appointment';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsInt,
    IsDateString,
    IsOptional,
    IsString,
    IsEnum,
    Matches,
    IsNotEmpty,
} from 'class-validator';

export class CreateAppointmentDto {
    @ApiProperty({ description: 'ID of the patient' })
    @IsInt()
    patientId: number;

    @ApiProperty({ description: 'ID of the doctor' })
    @IsInt()
    doctorId: number;

    @ApiProperty({ description: 'Date of the appointment' })
    @IsDateString()
    @IsNotEmpty()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'Date must be in YYYY-MM-DD format',
    })
    date: string;

    @ApiProperty({ description: 'Start time (HH:MM)' })
    @IsNotEmpty()
    @IsString()
    startTime?: string;

    @ApiProperty({ description: 'End time (HH:MM)' })
    @IsNotEmpty()
    @IsString()
    endTime?: string;

    @ApiProperty({ description: 'Reason for the appointment' })
    @IsOptional()
    @IsString()
    reason?: string;

    @ApiProperty({ description: 'Reason for cancelling the appointment' })
    @IsOptional()
    @IsString()
    cancelledReason?: string;

    @ApiProperty({ description: 'Status of the appointment' })
    @IsEnum(EAppointmentStatus)
    status: EAppointmentStatus;
}
