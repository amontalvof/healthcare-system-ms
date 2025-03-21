import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Appointment } from './appointment.entity';

@Entity()
export class Patient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    userId: string;

    @Column()
    countryCode: string;

    @Column()
    phone: string;

    @Column()
    address: string;

    // Use the JSON type for PostgreSQL
    @Column({ type: 'json' })
    emergencyContact: unknown;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Appointment, (appointment) => appointment.patient)
    appointments: Appointment[];
}
