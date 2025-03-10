import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength } from 'class-validator';

export class LoginUserDto {
    @ApiProperty({ description: 'Email of the user' })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Password of the user' })
    @IsString()
    @MaxLength(50)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
            'The password must have a Uppercase, lowercase letter and a number',
    })
    password: string;
}
