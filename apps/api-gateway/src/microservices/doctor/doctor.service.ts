import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { QUEUE_CLIENT_NAMES } from '@app/common-utils/queues/constants';
import { ClientProxy } from '@nestjs/microservices';
import { IJwtUser } from '@app/common-utils/jwt/user';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class DoctorService {
    constructor(
        @Inject(QUEUE_CLIENT_NAMES.DOCTOR_RMQ_CLIENT)
        private readonly doctorClient: ClientProxy,
    ) {}
    create(user: IJwtUser, createDoctorDto: CreateDoctorDto) {
        return lastValueFrom(
            this.doctorClient.send(
                { cmd: 'create.doctor' },
                { user, createDoctorDto },
            ),
        );
    }

    findAll() {
        return lastValueFrom(
            this.doctorClient.send({ cmd: 'read.doctors' }, {}),
        );
    }

    async findOne(id: number) {
        const result = await lastValueFrom(
            this.doctorClient.send({ cmd: 'read.doctor' }, id),
        );
        if (!result) {
            this.handleNotFound(id);
        }
        return result;
    }

    async update(id: number, updateDoctorDto: UpdateDoctorDto) {
        const result = await lastValueFrom(
            this.doctorClient.send(
                { cmd: 'update.doctor' },
                { id, updateDoctorDto },
            ),
        );
        if (!result) {
            this.handleNotFound(id);
        }
        return result;
    }

    async remove(id: number) {
        const result = await lastValueFrom(
            this.doctorClient.send({ cmd: 'delete.doctor' }, id),
        );
        if (!result) {
            this.handleNotFound(id);
        }
        return result;
    }

    async getDoctorsSpecialties() {
        const result = await lastValueFrom(
            this.doctorClient.send({ cmd: 'read.doctors.specialties' }, {}),
        );
        if (!result?.length) {
            throw new NotFoundException('No specialties found');
        }
        return result;
    }

    private handleNotFound(id: number) {
        throw new NotFoundException(`Doctor with ID ${id} not found`);
    }
}
