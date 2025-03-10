import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsObject,
    IsOptional,
    IsPhoneNumber,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export class RegisterPhoneNumberDto {
    @ApiProperty({ description: 'Country code of the user' })
    @IsString()
    countryCode: string;

    @ApiProperty({ description: 'Phone number of the user' })
    @IsString()
    @IsPhoneNumber()
    phone: string;
}

export class RegisterUserDto {
    @ApiProperty({ description: 'Email of the user' })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Phone number of the user' })
    @IsObject()
    @IsOptional()
    phoneNumber: RegisterPhoneNumberDto;

    @ApiProperty({ description: 'Full name of the user' })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    fullName: string;

    @ApiProperty({ description: 'Password of the user' })
    @IsString()
    @MaxLength(50)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
            'The password must have a Uppercase, lowercase letter and a number',
    })
    password: string;
}
