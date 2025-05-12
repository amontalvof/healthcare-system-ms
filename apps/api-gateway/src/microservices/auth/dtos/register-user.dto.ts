import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsEnum,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export enum UserRole {
    ADMIN = 'admin',
    PATIENT = 'patient',
    DOCTOR = 'doctor',
}

export class RegisterUserDto {
    @ApiProperty({ description: 'Email of the user' })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Full name of the user' })
    @IsString()
    @MinLength(4)
    @MaxLength(50)
    fullName: string;

    @ApiProperty({ description: 'Password of the user' })
    @IsString()
    @MinLength(8)
    @MaxLength(50)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
            'The password must have a Uppercase, lowercase letter and a number',
    })
    password: string;

    @ApiProperty({ description: 'User role' })
    @IsEnum(UserRole)
    role: string;
}
