import { ERole } from '@app/common-utils/jwt/user';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ERole[]) => {
    return SetMetadata(ROLES_KEY, roles);
};
