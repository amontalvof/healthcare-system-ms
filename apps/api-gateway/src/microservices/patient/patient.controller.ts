import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { UpdatePatientDto } from './dtos/update-patient.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { User } from '../../decorators/user.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PatientResponseDto } from './response/patient-response.dto';
import { ERole, IJwtUser } from '@app/common-utils/jwt/user';

@ApiTags('patients')
@ApiBearerAuth()
@Controller('patient')
export class PatientController {
    constructor(private readonly patientService: PatientService) {}

    @ApiOkResponse({
        description: 'Patient created successfully',
        type: PatientResponseDto,
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ERole.Admin, ERole.Patient)
    @Post()
    async create(
        @User() user: IJwtUser,
        @Body() createPatientDto: CreatePatientDto,
    ) {
        return this.patientService.create(user, createPatientDto);
    }

    @ApiOkResponse({
        description: 'List of patients',
        type: [PatientResponseDto],
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ERole.Admin)
    @Get()
    async findAll() {
        return this.patientService.findAll();
    }

    @ApiOkResponse({
        description: 'Patient found successfully',
        type: PatientResponseDto,
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ERole.Admin, ERole.Patient, ERole.Doctor)
    @Get(':identifier')
    async findOne(@Param('identifier') id: string) {
        return this.patientService.findOne(id);
    }

    @ApiOkResponse({
        description: 'Patient updated successfully',
        type: PatientResponseDto,
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ERole.Admin, ERole.Patient, ERole.Doctor)
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePatientDto: UpdatePatientDto,
    ) {
        return this.patientService.update(id, updatePatientDto);
    }

    @ApiOkResponse({
        description: 'Patient deleted successfully',
        type: PatientResponseDto,
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ERole.Admin)
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.patientService.remove(id);
    }
}
