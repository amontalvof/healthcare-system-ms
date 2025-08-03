import { ApiProperty } from '@nestjs/swagger';

export class UploadImageResponseDto {
    @ApiProperty({
        description: 'Secure URL of the uploaded image',
        example: 'https://example.com/image.jpg',
    })
    secureUrl: string;
}
