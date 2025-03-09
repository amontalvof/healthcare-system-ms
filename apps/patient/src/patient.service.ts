import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../libs/common-utils/src/db/prisma.service';
import { IUserDecorator } from './types/user';
import { ICreatePatientDto, IUpdatePatientDto } from './types/patient';

@Injectable()
export class PatientService {
    constructor(private readonly prisma: PrismaService) {}

    async create(user: IUserDecorator, createPatientDto: ICreatePatientDto) {
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

    async update(id: number, updatePatientDto: IUpdatePatientDto) {
        const patient = await this.findOne(id);
        if (!patient) {
            return null;
        }
        return this.prisma.patient.update({
            where: { id },
            data: updatePatientDto,
        });
    }

    async remove(id: number) {
        const patient = await this.findOne(id);
        if (!patient) {
            return null;
        }
        return this.prisma.patient.delete({ where: { id } });
    }
}
