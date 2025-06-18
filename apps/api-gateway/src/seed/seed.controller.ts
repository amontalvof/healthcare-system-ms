import { Controller, Post, UseGuards } from '@nestjs/common';
import { SeedService } from './seed.service';
import { BasicAuthGuard } from '../guards/basic-auth.guard';

@Controller('seed')
export class SeedController {
    constructor(private readonly seedService: SeedService) {}

    @UseGuards(BasicAuthGuard)
    @Post()
    async runSeed() {
        try {
            return await this.seedService.runSeed();
        } catch (error) {
            return console.error('Error running seed:', error);
        }
    }
}
