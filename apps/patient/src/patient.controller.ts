import { Controller } from '@nestjs/common';
import { PatientService } from './patient.service';
import { MessagePattern } from '@nestjs/microservices';
import { ICreatePatientDto, IUpdatePatientDto } from './types/patient';

@Controller()
export class PatientController {
    constructor(private readonly patientService: PatientService) {}

    @MessagePattern({ cmd: 'upload.patient.image' })
    async uploadImage({
        userId,
        profileImage,
    }: {
        userId: string;
        profileImage: Express.Multer.File;
    }) {
        return this.patientService.uploadImage(userId, profileImage);
    }

    @MessagePattern({ cmd: 'create.patient' })
    async create({
        createPatientDto,
    }: {
        createPatientDto: ICreatePatientDto;
    }) {
        return this.patientService.create(createPatientDto);
    }

    @MessagePattern({ cmd: 'read.patients' })
    async findAll() {
        return this.patientService.findAll();
    }

    @MessagePattern({ cmd: 'read.patient' })
    async findOne(identifier: string) {
        const id = Number(identifier);
        if (!isNaN(id)) {
            return this.patientService.findOne(id);
        }
        return this.patientService.findByUserId(identifier);
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
