import { Injectable } from '@nestjs/common';
import { ICreatePatientDto, IUpdatePatientDto } from './types/patient';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from '@app/common-utils/db/postgres/schemas/patient.entity';
import { Address } from '@app/common-utils/db/postgres/schemas/address.entity';
import { Repository } from 'typeorm';
import { CommonUtilsService } from '@app/common-utils';
import { InsurancesList } from '@app/common-utils/db/postgres/schemas/insurancesList.entity';

@Injectable()
export class PatientService {
    constructor(
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,
        @InjectRepository(Address)
        private readonly addressRepo: Repository<Address>,
        @InjectRepository(InsurancesList)
        private readonly insuranceRepo: Repository<InsurancesList>,
        private readonly commonUtilsService: CommonUtilsService,
    ) {}

    async create(createPatientDto: ICreatePatientDto) {
        try {
            const { insuranceId, address, ...rest } = createPatientDto;
            let savedAddress = await this.addressRepo.findOne({
                where: {
                    street: address.street,
                    city: address.city,
                    state: address.state,
                    postalCode: address.postalCode,
                },
            });
            if (!savedAddress) {
                const addressEntity = this.addressRepo.create(address);
                savedAddress = await this.addressRepo.save(addressEntity);
            }
            const insurance = this.insuranceRepo.create({ id: insuranceId });
            const patient = this.patientRepository.create({
                ...rest,
                insurance,
                address: savedAddress,
            });
            const saved = await this.patientRepository.save(patient);
            return this.patientRepository.findOne({
                where: { id: saved.id },
                relations: ['address', 'insurance'],
            });
        } catch (error) {
            this.commonUtilsService.handleTypeOrmError(error);
        }
    }

    async findAll() {
        return this.patientRepository.find({
            relations: ['address', 'insurance'],
        });
    }

    async findOne(id: number) {
        return this.patientRepository.findOne({
            where: { id },
            relations: ['address', 'insurance'],
        });
    }

    async update(id: number, updatePatientDto: IUpdatePatientDto) {
        const patient = await this.patientRepository.findOne({
            where: { id },
            relations: ['address', 'insurance'],
        });
        if (!patient) {
            return null;
        }
        const { insuranceId, address, ...rest } = updatePatientDto;

        if (address) {
            let addr = await this.addressRepo.findOne({
                where: {
                    street: address.street,
                    city: address.city,
                    state: address.state,
                    postalCode: address.postalCode,
                },
            });
            if (!addr) {
                addr = this.addressRepo.create(address);
                addr = await this.addressRepo.save(addr);
            }
            patient.address = addr;
        }

        if (insuranceId) {
            patient.insurance = this.insuranceRepo.create({ id: insuranceId });
        }

        this.patientRepository.merge(patient, rest);

        const saved = await this.patientRepository.save(patient);
        return this.patientRepository.findOne({
            where: { id: saved.id },
            relations: ['address', 'insurance'],
        });
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
