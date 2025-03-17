import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, Length } from 'class-validator';

export class VerifyDto {
    @ApiProperty({ description: 'Email of the user' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Verification code' })
    @IsNotEmpty()
    @IsString()
    @Length(6, 6)
    code: string;
}
