import { Controller } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { MessagePattern } from '@nestjs/microservices';
import {
    ICreateAppointmentDto,
    IUpdateAppointmentDto,
} from './types/appointment';
import { IJwtUser } from '@app/common-utils';

@Controller()
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) {}

    @MessagePattern({ cmd: 'create.appointment' })
    async create(createAppointmentDto: ICreateAppointmentDto) {
        return this.appointmentService.create(createAppointmentDto);
    }

    @MessagePattern({ cmd: 'read.appointments' })
    async findAll({
        user,
        page,
        limit,
    }: {
        user: IJwtUser;
        page: number;
        limit: number;
    }) {
        return this.appointmentService.findAll(user, page, limit);
    }

    @MessagePattern({ cmd: 'read.appointment' })
    async findOne(id: number) {
        return this.appointmentService.findOne(id);
    }

    @MessagePattern({ cmd: 'update.appointment' })
    async update({
        id,
        updateAppointmentDto,
    }: {
        id: number;
        updateAppointmentDto: IUpdateAppointmentDto;
    }) {
        return this.appointmentService.update(id, updateAppointmentDto);
    }

    @MessagePattern({ cmd: 'delete.appointment' })
    async remove(id: number) {
        return this.appointmentService.remove(id);
    }
}
