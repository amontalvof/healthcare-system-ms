import { Inject, Injectable } from '@nestjs/common';
import { PrismaService, QUEUE_CLIENT_NAMES } from '@app/common-utils';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
    ICreateAppointmentDto,
    IUpdateAppointmentDto,
} from './types/appointment';

@Injectable()
export class AppointmentService {
    constructor(
        private readonly prisma: PrismaService,
        @Inject(QUEUE_CLIENT_NAMES.NOTIFICATION_RMQ_CLIENT)
        private readonly notificationClient: ClientProxy,
    ) {}

    async create(createAppointmentDto: ICreateAppointmentDto) {
        try {
            const result = await this.prisma.appointment.create({
                data: {
                    patient: {
                        connect: { id: createAppointmentDto.patientId },
                    },
                    doctor: { connect: { id: createAppointmentDto.doctorId } },
                    date: new Date(createAppointmentDto.date),
                    reason: createAppointmentDto.reason,
                    status: createAppointmentDto.status,
                },
            });
            // TODO: Send real appointment scheduled to user
            this.notificationClient.emit('send.appointment.scheduled', {
                code: 'abc1234',
                email: '',
            });
            return result;
        } catch (error) {
            this.prisma.handlePrismaError(error);
        }
    }

    async findAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [appointments, total] = await Promise.all([
            this.prisma.appointment.findMany({
                skip,
                take: limit,
                orderBy: { date: 'desc' },
            }),
            this.prisma.appointment.count(),
        ]);
        return {
            total,
            page,
            limit,
            data: appointments,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findOne(id: number) {
        return this.prisma.appointment.findUnique({ where: { id } });
    }

    async update(id: number, updateAppointmentDto: IUpdateAppointmentDto) {
        return this.prisma.appointment.update({
            where: { id },
            data: {
                date: updateAppointmentDto.date
                    ? new Date(updateAppointmentDto.date)
                    : undefined,
                reason: updateAppointmentDto.reason,
                cancelledReason: updateAppointmentDto.cancelledReason,
                status: updateAppointmentDto.status,
            },
        });
    }

    async remove(id: number) {
        return this.prisma.appointment.delete({ where: { id } });
    }
}
