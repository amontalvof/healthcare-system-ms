import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from '../config/joi.validation';
import { PrismaService } from '@app/common-utils';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath:
                process.env.NODE_ENV === 'production'
                    ? '.env'
                    : './apps/patient/.env',
            validationSchema: envValidationSchema,
        }),
    ],
    controllers: [PatientController],
    providers: [PatientService, PrismaService],
})
export class PatientModule {}
