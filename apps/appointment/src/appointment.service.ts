import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
    ICreateAppointmentDto,
    IUpdateAppointmentDto,
} from './types/appointment';
import { ERole, IJwtUser } from '@app/common-utils/jwt/user';
import { QUEUE_CLIENT_NAMES } from '@app/common-utils/queues/constants';
import { CommonUtilsService } from '@app/common-utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from '@app/common-utils/db/postgres/schemas/appointment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentService {
    constructor(
        @Inject(QUEUE_CLIENT_NAMES.NOTIFICATION_RMQ_CLIENT)
        private readonly notificationClient: ClientProxy,
        @InjectRepository(Appointment)
        private readonly appointmentRepository: Repository<Appointment>,
        private readonly commonUtilsService: CommonUtilsService,
    ) {}

    async create(createAppointmentDto: ICreateAppointmentDto) {
        try {
            const insertResult = await this.appointmentRepository
                .createQueryBuilder()
                .insert()
                .into(Appointment)
                .values({
                    patientId: createAppointmentDto.patientId,
                    doctorId: createAppointmentDto.doctorId,
                    date: new Date(createAppointmentDto.date),
                    reason: createAppointmentDto.reason,
                    status: createAppointmentDto.status,
                })
                .returning('*') // PostgreSQL specific; returns the inserted row
                .execute();

            // Extract the newly created appointment id from the result
            const newAppointmentId = insertResult.generatedMaps[0].id;

            // Step 2: Query the appointment with joined relations
            const result = await this.appointmentRepository.findOne({
                where: { id: newAppointmentId },
                relations: ['patient', 'doctor'],
            });

            this.notificationClient.emit('send.appointment.scheduled', {
                email: result.patient.email,
                name: result.patient.fullName,
                date: result.date,
                doctor: result.doctor.fullName,
                clinic: result.doctor.clinic,
                address: result.doctor.clinicAddress,
                countryCode: result.doctor.countryCode,
                phone: result.doctor.phone,
            });
            return result;
        } catch (error) {
            this.commonUtilsService.handleTypeOrmError(error);
        }
    }

    async findAll(user: IJwtUser, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        let whereClause: any = {};
        if (user.roles.includes(ERole.Patient)) {
            whereClause = { patient: { userId: user.userId } };
        } else if (user.roles.includes(ERole.Doctor)) {
            whereClause = { doctor: { userId: user.userId } };
        }
        const [appointments, total] =
            await this.appointmentRepository.findAndCount({
                skip,
                take: limit,
                where: whereClause,
                order: { date: 'DESC' },
                relations: ['patient', 'doctor'],
            });

        return {
            total,
            page,
            limit,
            data: appointments,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findOne(id: number) {
        return this.appointmentRepository.findOne({ where: { id } });
    }

    async update(id: number, updateAppointmentDto: IUpdateAppointmentDto) {
        const appointment = await this.findOne(id);
        if (!appointment) {
            return null;
        }

        if (updateAppointmentDto.date) {
            appointment.date = new Date(updateAppointmentDto.date);
        }
        if (updateAppointmentDto.reason !== undefined) {
            appointment.reason = updateAppointmentDto.reason;
        }
        if (updateAppointmentDto.cancelledReason !== undefined) {
            appointment.cancelledReason = updateAppointmentDto.cancelledReason;
        }
        if (updateAppointmentDto.status !== undefined) {
            appointment.status = updateAppointmentDto.status;
        }

        return this.appointmentRepository.save(appointment);
    }

    async remove(id: number) {
        const appointment = await this.findOne(id);
        if (!appointment) {
            return null;
        }
        await this.appointmentRepository.remove(appointment);
        return appointment;
    }
}
