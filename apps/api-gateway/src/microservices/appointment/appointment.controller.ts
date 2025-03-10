import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
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
import { Role } from '@app/common-utils';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { AppointmentResponseDto } from './response/appointment-response.dto';
import { PaginatedAppointmentsDto } from './response/paginated-appointments.dto';

@ApiTags('appointment')
@ApiBearerAuth()
@Controller('appointment')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) {}

    @ApiOkResponse({
        description: 'Appointment created successfully',
        type: AppointmentResponseDto,
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.Patient, Role.Doctor)
    @Post('create')
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
    @Roles(Role.Admin)
    @Get('read')
    async findAll(@Query('page') page = '1', @Query('limit') limit = '10') {
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        return this.appointmentService.findAll(pageNumber, limitNumber);
    }

    @ApiOkResponse({
        description: 'Appointment found successfully',
        type: AppointmentResponseDto,
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.Patient, Role.Doctor)
    @Get('read/:id')
    async findOne(@Param('id') id: string) {
        return this.appointmentService.findOne(Number(id));
    }

    @ApiOkResponse({
        description: 'Appointment updated successfully',
        type: AppointmentResponseDto,
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.Patient, Role.Doctor)
    @Put('update/:id')
    async update(
        @Param('id') id: string,
        @Body() updateAppointmentDto: UpdateAppointmentDto,
    ) {
        return this.appointmentService.update(Number(id), updateAppointmentDto);
    }

    @ApiOkResponse({
        description: 'Appointment deleted successfully',
        type: AppointmentResponseDto,
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Delete('delete/:id')
    async remove(@Param('id') id: string) {
        return this.appointmentService.remove(Number(id));
    }
}
