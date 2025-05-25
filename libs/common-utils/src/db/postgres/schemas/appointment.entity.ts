import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    Unique,
    Index,
    DeleteDateColumn,
} from 'typeorm';
import { Patient } from './patient.entity';
import { Doctor } from './doctor.entity';
import { EAppointmentStatus } from '../types/appointment';

@Entity({ name: 'appointments' })
@Unique(['patientId', 'doctorId', 'date', 'startTime'])
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    // Foreign keys as explicit columns
    @Column()
    @Index()
    patientId: number;

    @Column()
    @Index()
    doctorId: number;

    @Column({ nullable: true })
    reason?: string;

    @Column({ nullable: true })
    cancelledReason?: string;

    @Column({
        type: 'enum',
        enum: EAppointmentStatus,
    })
    status: EAppointmentStatus;

    /** the date of the slot (year-month-day) */
    @Column({ type: 'date' })
    date: string;

    /** slot start time (e.g. '10:00') */
    @Column({ type: 'time' })
    startTime: string;

    /** slot end time (e.g. '10:30') */
    @Column({ type: 'time' })
    endTime: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    // Define the relation with Patient
    @ManyToOne(() => Patient, (patient) => patient.appointments)
    @JoinColumn({ name: 'patientId' })
    patient: Patient;

    // Define the relation with Doctor
    @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
    @JoinColumn({ name: 'doctorId' })
    doctor: Doctor;
}
