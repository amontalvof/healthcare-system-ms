import { Controller } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { MessagePattern } from '@nestjs/microservices';
import { IJwtUser } from '@app/common-utils/jwt/user';
import { ICreateDoctorDto } from './types/doctor';

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
}
