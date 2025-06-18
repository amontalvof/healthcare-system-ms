import { Injectable } from '@nestjs/common';
import { DoctorService } from '../microservices/doctor/doctor.service';
import { AuthService } from '../microservices/auth/auth.service';

@Injectable()
export class SeedService {
    constructor(
        private readonly authService: AuthService,
        private readonly doctorService: DoctorService,
    ) {}

    async runSeed() {
        try {
            // Seed users
            const users = await this.authService.populateUsers();
            // Seed Insurances
            const insurances = await this.doctorService.populateInsurances();
            // Seed doctors specialties
            const specialties =
                await this.doctorService.populateDoctorsSpecialties();
            // Seed doctors
            const doctors = await this.doctorService.populateDoctors();

            return {
                users,
                insurances,
                specialties,
                doctors,
            };
        } catch (error) {
            console.error('Seeding failed:', error);
            throw error;
        }
    }
}
