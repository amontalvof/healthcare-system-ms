import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { UpdateAppointmentDto } from './dtos/update-appointment.dto';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { AppointmentResponseDto } from './response/appointment-response.dto';
import { PaginatedAppointmentsDto } from './response/paginated-appointments.dto';
import { User } from '../../decorators/user.decorator';
import { ERole, IJwtUser } from '@app/common-utils/jwt/user';

@ApiTags('appointment')
@ApiBearerAuth()
@Controller('appointment')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) {}

    @Get('/booked-hours/:doctorId')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ERole.Admin, ERole.Patient, ERole.Doctor)
    async getBookedHours(
        @Param('doctorId', ParseIntPipe) doctorId: number,
        @Query('date') date: string,
    ) {
        return this.appointmentService.getBookedHours(doctorId, date);
    }

    @ApiOkResponse({
        description: 'Appointment created successfully',
        type: AppointmentResponseDto,
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ERole.Admin, ERole.Patient, ERole.Doctor)
    @Post()
    async create(@Body() createAppointmentDto: CreateAppointmentDto) {
        return this.appointmentService.create(createAppointmentDto);
    }

    @ApiOkResponse({
        description: 'List of appointments',
        type: PaginatedAppointmentsDto,
    })
    @ApiQuery({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number',
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Number of records per page',
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ERole.Admin, ERole.Doctor, ERole.Patient)
    @Get()
    async findAll(
        @User() user: IJwtUser,
        @Query('page') page = '1',
        @Query('limit') limit = '10',
    ) {
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        return this.appointmentService.findAll(user, pageNumber, limitNumber);
    }

    @ApiOkResponse({
        description: 'Appointment found successfully',
        type: AppointmentResponseDto,
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ERole.Admin, ERole.Patient, ERole.Doctor)
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.appointmentService.findOne(id);
    }

    @ApiOkResponse({
        description: 'Appointment updated successfully',
        type: AppointmentResponseDto,
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ERole.Admin, ERole.Patient, ERole.Doctor)
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateAppointmentDto: UpdateAppointmentDto,
    ) {
        return this.appointmentService.update(id, updateAppointmentDto);
    }

    @ApiOkResponse({
        description: 'Appointment deleted successfully',
        type: AppointmentResponseDto,
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ERole.Admin)
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.appointmentService.remove(id);
    }
}
