import { Module } from '@nestjs/common';
import { CommonUtilsService } from './common-utils.service';
import { CloudinaryService } from './storage/cloudinary';

@Module({
    providers: [CommonUtilsService, CloudinaryService],
    exports: [CommonUtilsService, CloudinaryService],
})
export class CommonUtilsModule {}
