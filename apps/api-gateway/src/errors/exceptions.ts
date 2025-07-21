import {
    BadRequestException,
    ConflictException,
    NotFoundException,
    UnauthorizedException,
    InternalServerErrorException,
} from '@nestjs/common';

export const exceptionsMap = {
    BadRequestException,
    ConflictException,
    UnauthorizedException,
    NotFoundException,
    InternalServerErrorException,
};

export const exceptionHandler = (params: {
    ok?: boolean;
    exception?: string;
    message: string;
}) => {
    const { ok, exception, message } = params;
    if (ok === false) {
        throw new exceptionsMap[exception](message);
    }
    return params;
};
