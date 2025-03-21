import { Injectable } from '@nestjs/common';
import { ICreatePatientDto, IUpdatePatientDto } from './types/patient';
import { IJwtUser } from '@app/common-utils/jwt/user';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from '@app/common-utils/db/postgres/schemas/patient.entity';
import { Repository } from 'typeorm';
import { CommonUtilsService } from '@app/common-utils';

@Injectable()
export class PatientService {
    constructor(
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,
        private readonly commonUtilsService: CommonUtilsService,
    ) {}

    async create(user: IJwtUser, createPatientDto: ICreatePatientDto) {
        try {
            const { userId } = user;
            const patient = this.patientRepository.create({
                ...createPatientDto,
                userId,
            });
            return await this.patientRepository.save(patient);
        } catch (error) {
            this.commonUtilsService.handleTypeOrmError(error);
        }
    }

    async findAll() {
        return this.patientRepository.find();
    }

    async findOne(id: number) {
        return this.patientRepository.findOne({ where: { id } });
    }

    async update(id: number, updatePatientDto: IUpdatePatientDto) {
        const patient = await this.findOne(id);
        if (!patient) {
            return null;
        }
        const updatedPatient = this.patientRepository.merge(
            patient,
            updatePatientDto,
        );
        return this.patientRepository.save(updatedPatient);
    }

    async remove(id: number) {
        const patient = await this.findOne(id);
        if (!patient) {
            return null;
        }
        await this.patientRepository.remove(patient);
        return patient;
    }
}
