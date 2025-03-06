import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { JwtAuthGuard, User } from '@app/common-utils';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { IUserDecorator } from './types/user';
import { UpdatePatientDto } from './dtos/update-patient.dto';

@Controller()
export class PatientController {
    constructor(private readonly patientService: PatientService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(
        @User() user: IUserDecorator,
        @Body() createPatientDto: CreatePatientDto,
    ) {
        return this.patientService.create(user, createPatientDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return this.patientService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.patientService.findOne(Number(id));
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updatePatientDto: UpdatePatientDto,
    ) {
        return this.patientService.update(Number(id), updatePatientDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.patientService.remove(Number(id));
    }
}
