import {
    BadRequestException,
    Controller,
    Get,
    Post,
    Query,
} from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';

@Controller()
export class ApiGatewayController {
    constructor(private readonly apiGatewayService: ApiGatewayService) {}

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
