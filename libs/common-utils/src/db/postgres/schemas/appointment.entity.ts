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
} from 'typeorm';
import { Patient } from './patient.entity';
import { Doctor } from './doctor.entity';
import { EAppointmentStatus } from '../types/appointment';

@Entity()
@Unique(['patientId', 'doctorId', 'date'])
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

    @Column({ type: 'timestamp' })
    date: Date;

    @Column({ nullable: true })
    reason?: string;

    @Column({ nullable: true })
    cancelledReason?: string;

    @Column({
        type: 'enum',
        enum: EAppointmentStatus,
    })
    status: EAppointmentStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // Define the relation with Patient
    @ManyToOne(() => Patient, (patient) => patient.appointments, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'patientId' })
    patient: Patient;

    // Define the relation with Doctor
    @ManyToOne(() => Doctor, (doctor) => doctor.appointments, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'doctorId' })
    doctor: Doctor;
}
