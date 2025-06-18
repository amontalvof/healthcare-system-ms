import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class BasicAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Basic ')) {
            throw new UnauthorizedException(
                'Missing or invalid Authorization header',
            );
        }
        const base64Credentials = authHeader.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString(
            'ascii',
        );
        const [username, password] = credentials.split(':');

        // Replace with your desired username and password
        const validUsername = process.env.SEED_BASIC_USER;
        const validPassword = process.env.SEED_BASIC_PASS;

        if (username === validUsername && password === validPassword) {
            return true;
        }
        throw new UnauthorizedException('Invalid credentials');
    }
}
