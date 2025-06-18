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

    async populateInsurances() {
        const { insurances } = await import('./data/seed');

        try {
            // Fetch existing insurances by name
            const existing = await this.insuranceRepo.find({
                where: insurances.map((i) => ({ name: i.name })),
            });
            const existingMap = new Map(existing.map((i) => [i.name, i]));

            // Prepare entities: update if exists, create if not
            const insuranceEntities = insurances.map(({ name }) => {
                const entity = existingMap.get(name) || new InsurancesList();
                entity.name = name;
                return entity;
            });

            await this.insuranceRepo.save(insuranceEntities);
            return { ok: true, message: 'Insurances populated successfully' };
        } catch (error) {
            return this.commonUtilsService.handleTypeOrmError(error);
        }
    }

    async populateDoctorsSpecialties() {
        const { specialties } = await import('./data/seed');

        try {
            // Fetch existing specialties by name
            const existing = await this.specialtyRepo.find({
                where: specialties.map((s) => ({ name: s.name })),
            });
            const existingMap = new Map(existing.map((s) => [s.name, s]));

            // Prepare entities: update if exists, create if not
            const specialtyEntities = specialties.map(
                ({ name, route, image }) => {
                    const entity =
                        existingMap.get(name) || new SpecialtiesList();
                    entity.name = name;
                    entity.route = route;
                    entity.image = image;
                    return entity;
                },
            );

            await this.specialtyRepo.save(specialtyEntities);
            return { ok: true, message: 'Specialties populated successfully' };
        } catch (error) {
            return this.commonUtilsService.handleTypeOrmError(error);
        }
    }

    async populateDoctors() {
        const { doctors } = await import('./data/seed');

        try {
            for (const doc of doctors) {
                // Handle address
                let savedAddress = await this.addressRepo.findOne({
                    where: {
                        street: doc.address.street,
                        city: doc.address.city,
                        state: doc.address.state,
                        postalCode: doc.address.postalCode,
                    },
                });
                if (!savedAddress) {
                    savedAddress = await this.addressRepo.save(
                        this.addressRepo.create(doc.address),
                    );
                }

                // Handle specialty
                const specialty = await this.specialtyRepo.findOne({
                    where: { id: doc.specialtyId },
                });

                // Handle insurances
                const insurances = [];
                if (doc.insuranceIds?.length) {
                    for (const id of doc.insuranceIds) {
                        const insurance = await this.insuranceRepo.findOne({
                            where: { id },
                        });
                        if (insurance) {
                            insurances.push(insurance);
                        }
                    }
                }

                // Upsert doctor by email
                let doctor = await this.doctorRepository.findOne({
                    where: { email: doc.email },
                    relations: [
                        'hospitalAddress',
                        'specialty',
                        'insurancesList',
                    ],
                });

                if (doctor) {
                    // Update existing
                    this.doctorRepository.merge(doctor, {
                        ...doc,
                        hospitalAddress: savedAddress,
                        specialty,
                        insurancesList: insurances,
                    });
                } else {
                    // Create new
                    doctor = this.doctorRepository.create({
                        ...doc,
                        hospitalAddress: savedAddress,
                        specialty,
                        insurancesList: insurances,
                    });
                }
                await this.doctorRepository.save(doctor);
            }
            return { ok: true, message: 'Doctors populated successfully' };
        } catch (error) {
            return this.commonUtilsService.handleTypeOrmError(error);
        }
    }
}
