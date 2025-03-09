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

@Controller('appointment')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body() createAppointmentDto: CreateAppointmentDto) {
        return this.appointmentService.create(createAppointmentDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('read')
    async findAll(@Query('page') page = '1', @Query('limit') limit = '10') {
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        return this.appointmentService.findAll(pageNumber, limitNumber);
    }

    @UseGuards(JwtAuthGuard)
    @Get('read/:id')
    async findOne(@Param('id') id: string) {
        return this.appointmentService.findOne(Number(id));
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    async update(
        @Param('id') id: string,
        @Body() updateAppointmentDto: UpdateAppointmentDto,
    ) {
        return this.appointmentService.update(Number(id), updateAppointmentDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    async remove(@Param('id') id: string) {
        return this.appointmentService.remove(Number(id));
    }
}
