import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class AddressInputDto {
    @ApiProperty({ description: 'Street address of the hospital' })
    @IsNotEmpty()
    @IsString()
    street: string;

    @ApiProperty({ description: 'City of the hospital' })
    @IsNotEmpty()
    @IsString()
    city: string;

    @ApiProperty({ description: 'State of the hospital' })
    @IsNotEmpty()
    @IsString()
    state: string;

    @ApiProperty({ description: 'Postal code of the hospital' })
    @IsNotEmpty()
    @IsString()
    postalCode: string;

    @ApiProperty({ description: 'Country of the hospital', required: false })
    @IsOptional()
    @IsString()
    country?: string;
}
