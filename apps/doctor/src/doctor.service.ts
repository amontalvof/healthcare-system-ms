import { IJwtUser } from '@app/common-utils/jwt/user';
import { Injectable } from '@nestjs/common';
import { ICreateDoctorDto } from './types/doctor';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from '@app/common-utils/db/postgres/schemas/doctor.entity';
import { Repository } from 'typeorm';
import { CommonUtilsService } from '@app/common-utils';

@Injectable()
export class DoctorService {
    constructor(
        @InjectRepository(Doctor)
        private readonly doctorRepository: Repository<Doctor>,
        private readonly commonUtilsService: CommonUtilsService,
    ) {}
    async create(user: IJwtUser, createDoctorDto: ICreateDoctorDto) {
        try {
            const { userId } = user;
            const doctor = this.doctorRepository.create({
                ...createDoctorDto,
                userId,
            });
            return await this.doctorRepository.save(doctor);
        } catch (error) {
            this.commonUtilsService.handleTypeOrmError(error);
        }
    }
}
