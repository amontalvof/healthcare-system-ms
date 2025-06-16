import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '../config/constants';

export const Public = () => {
    return SetMetadata(IS_PUBLIC_KEY, true);
};
