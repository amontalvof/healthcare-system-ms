import {
    IsInt,
    IsDateString,
    IsOptional,
    IsString,
    IsEnum,
} from 'class-validator';

export enum AppointmentStatus {
    SCHEDULED = 'SCHEDULED',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED',
}

export class CreateAppointmentDto {
    @IsInt()
    patientId: number;

    @IsInt()
    doctorId: number;

    @IsDateString()
    date: string;

    @IsOptional()
    @IsString()
    reason?: string;

    @IsOptional()
    @IsString()
    cancelledReason?: string;

    @IsEnum(AppointmentStatus)
    status: AppointmentStatus;
}
