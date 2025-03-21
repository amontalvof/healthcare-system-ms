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
export class Doctor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    userId: string;

    @Column()
    specialty: string;

    @Column()
    clinic: string;

    @Column()
    clinicAddress: string;

    @Column()
    countryCode: string;

    @Column()
    phone: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Appointment, (appointment) => appointment.doctor)
    appointments: Appointment[];
}
