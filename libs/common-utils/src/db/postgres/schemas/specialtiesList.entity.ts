import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
} from 'typeorm';
import { Doctor } from './doctor.entity';

@Entity({ name: 'specialties_list' })
export class SpecialtiesList {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, length: 100 })
    name: string;

    @Column({ unique: true, length: 100 })
    route: string;

    @Column({ type: 'text', nullable: true })
    image?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    @OneToMany(() => Doctor, (doctor) => doctor.specialty)
    doctors: Doctor[];
}
