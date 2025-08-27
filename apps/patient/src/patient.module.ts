import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from './config/joi.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonUtilsModule } from '@app/common-utils';
import { entities } from '@app/common-utils/db/postgres/schemas';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
            validationSchema: envValidationSchema,
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            synchronize: process.env.NODE_ENV !== 'production',
            entities,
            ssl:
                process.env.NODE_ENV === 'production'
                    ? { rejectUnauthorized: false } // common for managed PG (Neon/Heroku)
                    : false,
        }),
        TypeOrmModule.forFeature(entities),
        CommonUtilsModule,
    ],
    controllers: [PatientController],
    providers: [PatientService],
})
export class PatientModule {}
