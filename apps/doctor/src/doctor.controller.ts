import { Controller } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { MessagePattern } from '@nestjs/microservices';
import { IJwtUser } from '@app/common-utils/jwt/user';
import { ICreateDoctorDto, IUpdateDoctorDto } from './types/doctor';

@Controller()
export class DoctorController {
    constructor(private readonly doctorService: DoctorService) {}

    @MessagePattern({ cmd: 'create.doctor' })
    async create({
        user,
        createDoctorDto,
    }: {
        user: IJwtUser;
        createDoctorDto: ICreateDoctorDto;
    }) {
        return this.doctorService.create(user, createDoctorDto);
    }

    @MessagePattern({ cmd: 'read.doctors' })
    async findAll() {
        return this.doctorService.findAll();
    }

    @MessagePattern({ cmd: 'read.doctor' })
    async findOne(id: number) {
        return this.doctorService.findOne(id);
    }

    @MessagePattern({ cmd: 'update.doctor' })
    async update({
        id,
        updateDoctorDto,
    }: {
        id: number;
        updateDoctorDto: IUpdateDoctorDto;
    }) {
        return this.doctorService.update(id, updateDoctorDto);
    }

    @MessagePattern({ cmd: 'delete.doctor' })
    async remove(id: number) {
        return this.doctorService.remove(id);
    }
}
