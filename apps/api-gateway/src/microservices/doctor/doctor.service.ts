import { Inject, Injectable } from '@nestjs/common';
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
        return `This action returns all doctor`;
    }

    findOne(id: number) {
        return `This action returns a #${id} doctor`;
    }

    update(id: number, updateDoctorDto: UpdateDoctorDto) {
        return `This action updates a #${id} doctor`;
    }

    remove(id: number) {
        return `This action removes a #${id} doctor`;
    }
}
