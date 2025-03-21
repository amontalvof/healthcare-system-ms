import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
    ICreateAppointmentDto,
    IUpdateAppointmentDto,
} from './types/appointment';
import { ERole, IJwtUser } from '@app/common-utils/jwt/user';
import { QUEUE_CLIENT_NAMES } from '@app/common-utils/queues/constants';

@Injectable()
export class AppointmentService {
    constructor(
        @Inject(QUEUE_CLIENT_NAMES.NOTIFICATION_RMQ_CLIENT)
        private readonly notificationClient: ClientProxy,
    ) {}

    async create(createAppointmentDto: ICreateAppointmentDto) {
        try {
            // const result = await this.prisma.appointment.create({
            //     data: {
            //         patient: {
            //             connect: { id: createAppointmentDto.patientId },
            //         },
            //         doctor: { connect: { id: createAppointmentDto.doctorId } },
            //         date: new Date(createAppointmentDto.date),
            //         reason: createAppointmentDto.reason,
            //         status: createAppointmentDto.status,
            //     },
            //     include: {
            //         patient: true,
            //         doctor: true,
            //     },
            // });
            // this.notificationClient.emit('send.appointment.scheduled', {
            //     email: result.patient.email,
            //     name: result.patient.fullName,
            //     date: result.date,
            //     doctor: result.doctor.fullName,
            //     clinic: result.doctor.clinic,
            //     address: result.doctor.clinicAddress,
            //     countryCode: result.doctor.countryCode,
            //     phone: result.doctor.phone,
            // });
            // return result;
        } catch (error) {
            // this.prisma.handlePrismaError(error);
        }
    }

    async findAll(user: IJwtUser, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        // Build the where clause based on the user role using nested filters.
        // Prisma will join the related table automatically.
        let whereClause = {};

        if (user.roles.includes(ERole.Patient)) {
            whereClause = { patient: { userId: user.userId } };
        } else if (user.roles.includes(ERole.Doctor)) {
            whereClause = { doctor: { userId: user.userId } };
        }
        // For admin, whereClause remains {} so no filtering is applied.
        // Using $transaction ensures both queries run in a single DB round trip if possible.
        // const [appointments, total] = await this.prisma.$transaction([
        //     this.prisma.appointment.findMany({
        //         skip,
        //         where: whereClause,
        //         take: limit,
        //         orderBy: { date: 'desc' },
        //         include: { patient: true, doctor: true },
        //     }),
        //     this.prisma.appointment.count({
        //         where: whereClause,
        //     }),
        // ]);

        // return {
        //     total,
        //     page,
        //     limit,
        //     data: appointments,
        //     totalPages: Math.ceil(total / limit),
        // };
    }

    async findOne(id: number) {
        // return this.prisma.appointment.findUnique({ where: { id } });
    }

    async update(id: number, updateAppointmentDto: IUpdateAppointmentDto) {
        // return this.prisma.appointment.update({
        //     where: { id },
        //     data: {
        //         date: updateAppointmentDto.date
        //             ? new Date(updateAppointmentDto.date)
        //             : undefined,
        //         reason: updateAppointmentDto.reason,
        //         cancelledReason: updateAppointmentDto.cancelledReason,
        //         status: updateAppointmentDto.status,
        //     },
        // });
    }

    async remove(id: number) {
        // return this.prisma.appointment.delete({ where: { id } });
    }
}
