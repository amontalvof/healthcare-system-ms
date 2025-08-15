export interface AppointmentPaymentSessionItem {
    appointmentId: number;
    date: string;
    startTime: string;
    endTime: string;
    doctorName: string;
    doctorDegree: string;
    patientName: string;
    price: number;
    quantity: number;
}

export interface AppointmentPaymentSession {
    currency: string;
    items: AppointmentPaymentSessionItem[];
}
