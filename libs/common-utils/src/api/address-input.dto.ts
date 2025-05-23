import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class AddressInputDto {
    @ApiProperty({ description: 'Street' })
    @IsNotEmpty()
    @IsString()
    street: string;

    @ApiProperty({ description: 'City' })
    @IsNotEmpty()
    @IsString()
    city: string;

    @ApiProperty({ description: 'State' })
    @IsNotEmpty()
    @IsString()
    state: string;

    @ApiProperty({ description: 'Postal Code' })
    @IsNotEmpty()
    @IsString()
    postalCode: string;

    @ApiProperty({ description: 'Country', required: false })
    @IsOptional()
    @IsString()
    country?: string;
}
