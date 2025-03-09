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
    @IsString()
    countryCode: string;
    @IsString()
    @IsPhoneNumber()
    phone: string;
}

export class RegisterUserDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsObject()
    @IsOptional()
    phoneNumber: RegisterPhoneNumberDto;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    fullName: string;

    @IsString()
    @MaxLength(50)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
            'The password must have a Uppercase, lowercase letter and a number',
    })
    password: string;
}
