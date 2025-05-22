import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    ParseIntPipe,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { ERole, IJwtUser } from '@app/common-utils/jwt/user';
import { Roles } from '../../decorators/roles.decorator';
import { User } from '../../decorators/user.decorator';
import { DoctorResponseDto } from './responses/doctor-response.dto';

@ApiTags('doctors')
@ApiBearerAuth()
@Controller('doctor')
export class DoctorController {
    constructor(private readonly doctorService: DoctorService) {}

    @ApiOkResponse({
        description: 'Doctor created successfully',
        type: DoctorResponseDto,
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ERole.Admin)
    @Post()
    create(@User() user: IJwtUser, @Body() createDoctorDto: CreateDoctorDto) {
        return this.doctorService.create(user, createDoctorDto);
    }

    @ApiOkResponse({
        description: 'List of doctors',
        type: [DoctorResponseDto],
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ERole.Admin)
    @Get()
    findAll() {
        return this.doctorService.findAll();
    }

    @ApiOkResponse({
        description: 'Doctor found successfully',
        type: DoctorResponseDto,
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ERole.Admin)
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.doctorService.findOne(id);
    }

    @ApiOkResponse({
        description: 'Doctor updated successfully',
        type: DoctorResponseDto,
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ERole.Admin)
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDoctorDto: UpdateDoctorDto,
    ) {
        return this.doctorService.update(id, updateDoctorDto);
    }

    @ApiOkResponse({
        description: 'Doctor removed successfully',
        type: DoctorResponseDto,
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ERole.Admin)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.doctorService.remove(id);
    }
}
