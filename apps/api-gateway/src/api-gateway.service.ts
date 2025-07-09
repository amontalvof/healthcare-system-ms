import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ApiGatewayService {
    async geocodeWithCensus(
        oneline: string,
    ): Promise<{ lat: number; lon: number } | null> {
        const url =
            'https://geocoding.geo.census.gov/geocoder/locations/onelineaddress';
        const { data } = await axios.get(url, {
            params: {
                address: oneline,
                benchmark: 'Public_AR_Current',
                format: 'json',
            },
        });

        const matches = data?.result?.addressMatches;
        if (!Array.isArray(matches) || matches.length === 0) {
            return null;
        }
        const { x: lon, y: lat } = matches[0].coordinates;
        return { lat, lon };
    }
}
