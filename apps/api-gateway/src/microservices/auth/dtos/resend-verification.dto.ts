import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ResendVerificationDto {
    @ApiProperty({ description: 'Email of the user' })
    @IsEmail()
    email: string;
}
