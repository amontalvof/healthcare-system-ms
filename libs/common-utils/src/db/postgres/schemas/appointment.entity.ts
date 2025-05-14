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
import { TimeSlot } from './timeSlot.entity';

@Entity({ name: 'appointments' })
@Unique(['patientId', 'doctorId', 'slotId'])
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

    @Column()
    @Index()
    slotId: number;

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

    @ManyToOne(() => TimeSlot, (slot) => slot.appointment, { eager: true })
    @JoinColumn({ name: 'slotId' })
    slot: TimeSlot;
}
