import { Injectable } from '@nestjs/common';
import { ICreateDoctorDto, IUpdateDoctorDto } from './types/doctor';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from '@app/common-utils/db/postgres/schemas/doctor.entity';
import { Repository } from 'typeorm';
import { CommonUtilsService } from '@app/common-utils';
import { Address } from '@app/common-utils/db/postgres/schemas/address.entity';
import { SpecialtiesList } from '@app/common-utils/db/postgres/schemas/specialtiesList.entity';
import { InsurancesList } from '@app/common-utils/db/postgres/schemas/insurancesList.entity';

@Injectable()
export class DoctorService {
    constructor(
        @InjectRepository(Doctor)
        private readonly doctorRepository: Repository<Doctor>,
        @InjectRepository(Address)
        private readonly addressRepo: Repository<Address>,
        @InjectRepository(SpecialtiesList)
        private readonly specialtyRepo: Repository<SpecialtiesList>,
        @InjectRepository(InsurancesList)
        private readonly insuranceRepo: Repository<InsurancesList>,
        private readonly commonUtilsService: CommonUtilsService,
    ) {}

    async create(createDoctorDto: ICreateDoctorDto) {
        try {
            const { address, specialtyId, insuranceIds, ...rest } =
                createDoctorDto;

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

            const specialty = this.specialtyRepo.create({ id: specialtyId });
            const insurances = (insuranceIds || []).map((id) =>
                this.insuranceRepo.create({ id }),
            );

            const doctor = this.doctorRepository.create({
                ...rest,
                specialty,
                hospitalAddress: savedAddress,
                insurancesList: insurances,
            });
            const saved = await this.doctorRepository.save(doctor);
            return this.doctorRepository.findOne({
                where: { id: saved.id },
                relations: ['specialty', 'insurancesList', 'hospitalAddress'],
            });
        } catch (error) {
            return this.commonUtilsService.handleTypeOrmError(error);
        }
    }

    async findAll() {
        return this.doctorRepository.find({
            relations: ['specialty', 'insurancesList', 'hospitalAddress'],
        });
    }

    async findOne(id: number) {
        return this.doctorRepository.findOne({
            where: { id },
            relations: ['specialty', 'insurancesList', 'hospitalAddress'],
        });
    }

    async update(id: number, updateDoctorDto: IUpdateDoctorDto) {
        const doctor = await this.doctorRepository.findOne({
            where: { id },
            relations: ['specialty', 'insurancesList', 'hospitalAddress'],
        });
        if (!doctor) {
            return null;
        }
        const { address, specialtyId, insuranceIds, ...rest } = updateDoctorDto;

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
            doctor.hospitalAddress = addr;
        }

        if (specialtyId) {
            doctor.specialty = this.specialtyRepo.create({ id: specialtyId });
        }

        if (insuranceIds?.length) {
            doctor.insurancesList = insuranceIds.map((i) =>
                this.insuranceRepo.create({ id: i }),
            );
        }

        this.doctorRepository.merge(doctor, rest);

        const saved = await this.doctorRepository.save(doctor);

        return this.doctorRepository.findOne({
            where: { id: saved.id },
            relations: ['hospitalAddress', 'specialty', 'insurancesList'],
        });
    }

    async remove(id: number) {
        const doctor = await this.findOne(id);
        if (!doctor) {
            return null;
        }
        await this.doctorRepository.softRemove(doctor);
        return doctor;
    }

    async getDoctorsSpecialties() {
        const specialties = await this.specialtyRepo.find();
        if (!specialties || specialties.length === 0) {
            return [];
        }
        return specialties;
    }
}
