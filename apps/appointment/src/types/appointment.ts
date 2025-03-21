import { EAppointmentStatus } from '@app/common-utils/db/postgres/types/appointment';

export interface ICreateAppointmentDto {
    patientId: number;
    doctorId: number;
    date: Date;
    status: EAppointmentStatus;
    reason?: string;
    cancelledReason?: string;
}

export interface IUpdateAppointmentDto extends Partial<ICreateAppointmentDto> {}
