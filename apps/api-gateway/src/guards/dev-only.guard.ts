import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';

@Injectable()
export class DevOnlyGuard implements CanActivate {
    canActivate(): boolean {
        const env = process.env.NODE_ENV;
        if (env === 'production') {
            throw new ForbiddenException(
                'Seeding is not allowed in production.',
            );
        }
        return true;
    }
}
