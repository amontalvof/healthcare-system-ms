import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from '../config/joi.validation';
import { TypeOrmModule } from '@nestjs/typeorm';

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
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [],
            synchronize: process.env.NODE_ENV !== 'production',
        }),
    ],
    controllers: [PatientController],
    providers: [PatientService],
})
export class PatientModule {}
