import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from './config/joi.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from '@app/common-utils/db/postgres/schemas/patient.entity';
import { Appointment } from '@app/common-utils/db/postgres/schemas/appointment.entity';
import { Doctor } from '@app/common-utils/db/postgres/schemas/doctor.entity';
import { CommonUtilsModule } from '@app/common-utils';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: './apps/patient/.env',
            validationSchema: envValidationSchema,
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [Patient, Doctor, Appointment],
            synchronize: process.env.NODE_ENV !== 'production',
        }),
        TypeOrmModule.forFeature([Patient, Doctor, Appointment]),
        CommonUtilsModule,
    ],
    controllers: [PatientController],
    providers: [PatientService],
})
export class PatientModule {}
