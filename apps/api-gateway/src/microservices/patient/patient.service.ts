import { QUEUE_CLIENT_NAMES } from '@app/common-utils';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { lastValueFrom } from 'rxjs';
import { UpdatePatientDto } from './dtos/update-patient.dto';
import { IUserDecorator } from '../../types/user';

@Injectable()
export class PatientService {
    constructor(
        @Inject(QUEUE_CLIENT_NAMES.PATIENT_RMQ_CLIENT)
        private readonly patientClient: ClientProxy,
    ) {}

    create(user: IUserDecorator, createPatientDto: CreatePatientDto) {
        return lastValueFrom(
            this.patientClient.send(
                { cmd: 'create.patient' },
                { user, createPatientDto },
            ),
        );
    }

    findAll() {
        return lastValueFrom(
            this.patientClient.send({ cmd: 'read.patients' }, {}),
        );
    }

    async findOne(id: number) {
        const result = await lastValueFrom(
            this.patientClient.send({ cmd: 'read.patient' }, id),
        );
        if (!result) {
            this.handleNotFound(id);
        }
        return result;
    }

    async update(id: number, updatePatientDto: UpdatePatientDto) {
        const result = await lastValueFrom(
            this.patientClient.send(
                { cmd: 'update.patient' },
                { id, updatePatientDto },
            ),
        );
        if (!result) {
            this.handleNotFound(id);
        }
        return result;
    }

    async remove(id: number) {
        const result = await lastValueFrom(
            this.patientClient.send({ cmd: 'delete.patient' }, id),
        );
        if (!result) {
            this.handleNotFound(id);
        }
        return result;
    }

    private handleNotFound(id: number) {
        throw new NotFoundException(`Patient with ID ${id} not found`);
    }
}
