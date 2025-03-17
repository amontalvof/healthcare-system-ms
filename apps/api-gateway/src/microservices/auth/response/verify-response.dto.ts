import { ApiProperty } from '@nestjs/swagger';

export class VerifyResponseDto {
    @ApiProperty({
        description: 'Indicates if the verification was successful',
    })
    ok: boolean;

    @ApiProperty({
        description: 'The message returned after verifying',
    })
    message: string;
}
