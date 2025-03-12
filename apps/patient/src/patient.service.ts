import { Injectable } from '@nestjs/common';
import { ICreatePatientDto, IUpdatePatientDto } from './types/patient';
import { IJwtUser, PrismaService } from '@app/common-utils';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class PatientService {
    constructor(private readonly prisma: PrismaService) {}

    async create(user: IJwtUser, createPatientDto: ICreatePatientDto) {
        try {
            const { userId } = user;
            const result = await this.prisma.patient.create({
                data: { ...createPatientDto, userId },
            });
            return result;
        } catch (error) {
            this.prisma.handlePrismaError(error);
        }
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
