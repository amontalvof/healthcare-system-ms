import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Appointment } from './appointment.entity';
import { InsurancesList } from './insurancesList.entity';
import { Address } from './address.entity';
import { ESex } from '../types/patient';

@Entity({ name: 'patients' })
export class Patient {
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
    countryCode: string;

    @Column()
    phone: string;

    // Use the JSON type for PostgreSQL
    @Column({ type: 'json' })
    emergencyContact: unknown;

    @Column({
        type: 'enum',
        enum: ESex,
        default: ESex.MALE,
    })
    sex: ESex;

    @Column()
    birthDate: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    @ManyToOne(() => InsurancesList, (insurance) => insurance.patients)
    @JoinColumn({ name: 'insuranceId' })
    insurance: InsurancesList;

    @ManyToOne(() => Address, (address) => address.patients)
    @JoinColumn({ name: 'addressId' })
    address: Address;

    @OneToMany(() => Appointment, (appointment) => appointment.patient)
    appointments: Appointment[];
}
