// src/entities/TimeSlot.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne,
    JoinColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    CreateDateColumn,
} from 'typeorm';
import { Doctor } from './doctor.entity';
import { Appointment } from './appointment.entity';

@Entity('time_slots')
export class TimeSlot {
    @PrimaryGeneratedColumn()
    id: number;

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

    /** for soft-deletes of old slots */
    @DeleteDateColumn()
    deletedAt?: Date;

    /** which doctor this slot belongs to */
    @ManyToOne(() => Doctor, (doctor) => doctor.slots, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'doctorId' })
    doctor: Doctor;

    /** if booked, points to the appointment */
    @OneToOne(() => Appointment, (appointment) => appointment.slot, {
        nullable: true,
    })
    @JoinColumn({ name: 'appointmentId' })
    appointment?: Appointment;
}
