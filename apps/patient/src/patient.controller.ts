import { Controller } from '@nestjs/common';
import { PatientService } from './patient.service';
import { MessagePattern } from '@nestjs/microservices';
import { ICreatePatientDto, IUpdatePatientDto } from './types/patient';
import { IJwtUser } from '@app/common-utils';

@Controller()
export class PatientController {
    constructor(private readonly patientService: PatientService) {}

    @MessagePattern({ cmd: 'create.patient' })
    async create({
        user,
        createPatientDto,
    }: {
        user: IJwtUser;
        createPatientDto: ICreatePatientDto;
    }) {
        return this.patientService.create(user, createPatientDto);
    }

    @MessagePattern({ cmd: 'read.patients' })
    async findAll() {
        return this.patientService.findAll();
    }

    @MessagePattern({ cmd: 'read.patient' })
    async findOne(id: number) {
        return this.patientService.findOne(id);
    }

    @MessagePattern({ cmd: 'update.patient' })
    async update({
        id,
        updatePatientDto,
    }: {
        id: number;
        updatePatientDto: IUpdatePatientDto;
    }) {
        return this.patientService.update(id, updatePatientDto);
    }

    @MessagePattern({ cmd: 'delete.patient' })
    async remove(id: number) {
        return this.patientService.remove(id);
    }
}
