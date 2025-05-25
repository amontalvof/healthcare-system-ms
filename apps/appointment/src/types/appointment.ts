import { EAppointmentStatus } from '@app/common-utils/db/postgres/types/appointment';

export interface ICreateAppointmentDto {
    patientId: number;
    doctorId: number;
    date: string; // YYYY-MM-DD format
    startTime: string;
    endTime: string;
    status: EAppointmentStatus;
    reason?: string;
    cancelledReason?: string;
}

export interface IUpdateAppointmentDto
    extends Omit<Partial<ICreateAppointmentDto>, 'patientId' | 'doctorId'> {}
