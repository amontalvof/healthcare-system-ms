import { EAppointmentStatus } from '@app/common-utils/db/postgres/types/appointment';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsInt,
    IsDateString,
    IsOptional,
    IsString,
    IsEnum,
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
    date: string;

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
