import { Role } from '@app/common-utils';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => {
    return SetMetadata(ROLES_KEY, roles);
};
