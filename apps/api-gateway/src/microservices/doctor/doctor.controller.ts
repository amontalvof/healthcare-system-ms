import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { ERole, IJwtUser } from '@app/common-utils/jwt/user';
import { Roles } from '../../decorators/roles.decorator';
import { User } from '../../decorators/user.decorator';

@ApiTags('doctors')
@ApiBearerAuth()
@Controller('doctor')
export class DoctorController {
    constructor(private readonly doctorService: DoctorService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ERole.Admin)
    @Post()
    create(@User() user: IJwtUser, @Body() createDoctorDto: CreateDoctorDto) {
        return this.doctorService.create(user, createDoctorDto);
    }

    @Get()
    findAll() {
        return this.doctorService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.doctorService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
        return this.doctorService.update(+id, updateDoctorDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.doctorService.remove(+id);
    }
}
