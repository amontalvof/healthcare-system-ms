import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
    Unique,
} from 'typeorm';
import { Doctor } from './doctor.entity';
import { Patient } from './patient.entity';

@Entity({ name: 'addresses' })
@Unique(['street', 'city', 'state', 'postalCode'])
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 150 })
    street: string;

    @Column({ length: 100 })
    city: string;

    @Column({ length: 100 })
    state: string;

    @Column({ length: 20 })
    postalCode: string;

    @Column({ length: 100, nullable: true })
    country?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    @OneToMany(() => Doctor, (doctor) => doctor.hospitalAddress)
    doctors: Doctor[];

    @OneToMany(() => Patient, (patient) => patient.address)
    patients: Patient[];
}
