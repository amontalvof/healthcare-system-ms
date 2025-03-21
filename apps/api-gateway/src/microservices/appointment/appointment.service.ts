import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { lastValueFrom } from 'rxjs';
import { UpdateAppointmentDto } from './dtos/update-appointment.dto';
import { IJwtUser } from '@app/common-utils/jwt/user';
import { QUEUE_CLIENT_NAMES } from '@app/common-utils/queues/constants';

@Injectable()
export class AppointmentService {
    constructor(
        @Inject(QUEUE_CLIENT_NAMES.APPOINTMENT_RMQ_CLIENT)
        private readonly appointmentClient: ClientProxy,
    ) {}

    create(createAppointmentDto: CreateAppointmentDto) {
        return this.appointmentClient.send(
            { cmd: 'create.appointment' },
            createAppointmentDto,
        );
    }

    findAll(user: IJwtUser, page: number, limit: number) {
        return this.appointmentClient.send(
            { cmd: 'read.appointments' },
            { page, limit, user },
        );
    }

    async findOne(id: number) {
        const result = await lastValueFrom(
            this.appointmentClient.send({ cmd: 'read.appointment' }, id),
        );
        if (!result) {
            this.handleNotFound(id);
        }
        return result;
    }

    async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
        const result = await this.findOne(id);
        if (!result) {
            this.handleNotFound(id);
        }
        return this.appointmentClient.send(
            { cmd: 'update.appointment' },
            { id, updateAppointmentDto },
        );
    }

    async remove(id: number) {
        const result = await this.findOne(id);
        if (!result) {
            this.handleNotFound(id);
        }
        return this.appointmentClient.send({ cmd: 'delete.appointment' }, id);
    }

    private handleNotFound(id: number) {
        throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
}
