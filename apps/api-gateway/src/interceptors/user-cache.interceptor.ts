import { CacheInterceptor } from '@nestjs/cache-manager';
import { ExecutionContext, Injectable } from '@nestjs/common';
// Import PatientController to target its findOne route
import { PatientController } from '../microservices/patient/patient.controller';

@Injectable()
export class UserCacheInterceptor extends CacheInterceptor {
    trackBy(context: ExecutionContext): string | undefined {
        const request = context.switchToHttp().getRequest();
        // Skip caching only for PatientController 'findOne' (GET /patient/:identifier)
        if (
            context.getClass() === PatientController &&
            request.method === 'GET' &&
            request.params?.identifier
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
