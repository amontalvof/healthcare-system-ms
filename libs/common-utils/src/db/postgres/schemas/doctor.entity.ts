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

    @Column({ nullable: true })
    imageUrl: string;

    @Column()
    specialty: string;

    @Column()
    degree: string;

    @Column()
    experience: string;

    @Column({ nullable: true })
    about: string;

    @Column()
    fees: number;

    @Column()
    clinic: string;

    @Column()
    address: string;

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
