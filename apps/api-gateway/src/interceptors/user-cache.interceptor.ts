import { CacheInterceptor } from '@nestjs/cache-manager';
import { ExecutionContext, Injectable } from '@nestjs/common';
// Import PatientController to target its findOne route
import { PatientController } from '../microservices/patient/patient.controller';
import { AppointmentController } from '../microservices/appointment/appointment.controller';

@Injectable()
export class UserCacheInterceptor extends CacheInterceptor {
    trackBy(context: ExecutionContext): string | undefined {
        const request = context.switchToHttp().getRequest();
        // TODO: Find better solution to ignore cache specific routes, then remove these conditions
        // Skip caching only for PatientController 'findOne' (GET /patient/:identifier)
        if (
            context.getClass() === PatientController &&
            request.method === 'GET' &&
            request.params?.identifier
        ) {
            return undefined;
        }
        // Skip caching only for AppointmentController 'findAll' (GET /appointment?page=1&limit=10)
        if (
            context.getClass() === AppointmentController &&
            request.method === 'GET' &&
            !request.params?.identifier && // No identifier param means it's the collection route
            (request.query?.page || request.query?.limit) // Pagination query params exist
        ) {
            return undefined;
        }
        // Use default key and include userId if available
        const defaultKey = super.trackBy(context);
        if (defaultKey && request?.user?.userId) {
            return `${defaultKey}:${request.user.userId}`;
        }
        return defaultKey;
    }
}
