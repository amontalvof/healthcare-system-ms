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
import { CreatePatientDto } from './dtos/create-patient.dto';
import { UpdatePatientDto } from './dtos/update-patient.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { User } from '../../decorators/user.decorator';
import { IUserDecorator } from '../../types/user';

@Controller('patient')
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
    @Get('read')
    async findAll() {
        return this.patientService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('read/:id')
    async findOne(@Param('id') id: string) {
        return this.patientService.findOne(Number(id));
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
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
