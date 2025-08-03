import {
    BadRequestException,
    Controller,
    Get,
    Post,
    Query,
} from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { ApiOkResponse, ApiProperty } from '@nestjs/swagger';

export class GeocodeResponseDto {
    @ApiProperty({
        description: 'Latitude of the geocoded address',
        example: 37.7749,
    })
    lat: number;

    @ApiProperty({
        description: 'Longitude of the geocoded address',
        example: -122.4194,
    })
    lon: number;
}

@Controller()
export class ApiGatewayController {
    constructor(private readonly apiGatewayService: ApiGatewayService) {}

    @ApiOkResponse({
        description: 'Geocoded address',
        type: GeocodeResponseDto,
    })
    @Get('geocode')
    async geocode(
        @Query('street') street: string,
        @Query('city') city: string,
        @Query('state') state: string,
        @Query('postalCode') postalCode: string,
    ) {
        if (!street || !city || !state || !postalCode) {
            throw new BadRequestException('Missing address component');
        }
        return this.apiGatewayService.geocodeWithCensus(
            `${street}, ${city}, ${state} ${postalCode}`,
        );
    }
}
