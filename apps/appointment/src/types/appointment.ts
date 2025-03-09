export enum AppointmentStatus {
    SCHEDULED = 'SCHEDULED',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}

export interface ICreateAppointmentDto {
    patientId: number;
    doctorId: number;
    date: Date;
    status: AppointmentStatus;
    reason?: string;
    cancelledReason?: string;
}

export interface IUpdateAppointmentDto extends Partial<ICreateAppointmentDto> {}
