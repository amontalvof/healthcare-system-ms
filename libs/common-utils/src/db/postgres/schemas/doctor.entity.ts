import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    DeleteDateColumn,
    JoinColumn,
    ManyToMany,
    ManyToOne,
} from 'typeorm';
import { Appointment } from './appointment.entity';
import { Address } from './address.entity';
import { InsurancesList } from './insurancesList.entity';
import { SpecialtiesList } from './specialtiesList.entity';

@Entity({ name: 'doctors' })
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
    degree: string;

    @Column()
    experience: string;

    @Column({ nullable: true })
    about: string;

    @Column()
    fees: number;

    @Column()
    hospital: string;

    @Column()
    countryCode: string;

    @Column()
    phone: string;

    @Column({ type: 'time', default: '08:00' })
    workStart: string;

    /** default daily end time (e.g. '17:00') */
    @Column({ type: 'time', default: '17:00' })
    workEnd: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    @ManyToMany(() => InsurancesList, (insurance) => insurance.doctors)
    insurancesList: InsurancesList[];

    @ManyToOne(() => Address, (address) => address.doctors)
    @JoinColumn({ name: 'addressId' })
    hospitalAddress: Address;

    @OneToMany(() => Appointment, (appointment) => appointment.doctor)
    appointments: Appointment[];

    @ManyToOne(() => SpecialtiesList, (spec) => spec.doctors)
    @JoinColumn({ name: 'specialtyId' })
    specialty: SpecialtiesList;
}
