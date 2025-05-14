import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Doctor } from './doctor.entity';
import { Patient } from './patient.entity';

@Entity({ name: 'insurances_list' })
export class InsurancesList {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 150 })
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    @ManyToMany(() => Doctor, (doctor) => doctor.insurancesList)
    @JoinTable({ name: 'doctor_insurance' }) // the join table
    doctors: Doctor[];

    @OneToMany(() => Patient, (patient) => patient.insurance)
    patients: Patient[];
}
