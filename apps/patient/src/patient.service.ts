import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../libs/common-utils/src/db/prisma.service';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { IUserDecorator } from './types/user';
import { UpdatePatientDto } from './dtos/update-patient.dto';

@Injectable()
export class PatientService {
    constructor(private readonly prisma: PrismaService) {}

    async create(user: IUserDecorator, createPatientDto: CreatePatientDto) {
        const { userId } = user;
        return this.prisma.patient.create({
            data: { ...createPatientDto, userId },
        });
    }

    async findAll() {
        return this.prisma.patient.findMany();
    }

    async findOne(id: number) {
        return this.prisma.patient.findUnique({ where: { id } });
    }

    async update(id: number, updatePatientDto: UpdatePatientDto) {
        return this.prisma.patient.update({
            where: { id },
            data: updatePatientDto,
        });
    }

    async remove(id: number) {
        return this.prisma.patient.delete({ where: { id } });
    }
}
