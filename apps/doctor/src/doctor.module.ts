import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
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
        }),
        TypeOrmModule.forFeature(entities),
        CommonUtilsModule,
    ],
    controllers: [DoctorController],
    providers: [DoctorService],
})
export class DoctorModule {}
