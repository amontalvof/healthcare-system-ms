import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AuthModule } from '../microservices/auth/auth.module';
import { DoctorModule } from '../microservices/doctor/doctor.module';

@Module({
    imports: [AuthModule, DoctorModule],
    controllers: [SeedController],
    providers: [SeedService],
})
export class SeedModule {}
