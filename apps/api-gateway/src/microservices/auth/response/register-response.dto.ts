import { Role } from '@app/common-utils';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponseDto {
    @ApiProperty({ description: 'The email address of the user' })
    email: string;

    @ApiProperty({ description: 'The full name of the user' })
    fullName: string;

    @ApiProperty({ description: 'Indicates if the user is active' })
    isActive: boolean;

    @ApiProperty({
        description: 'The roles assigned to the user',
        isArray: true,
    })
    roles: Role[];

    @ApiProperty({ description: 'The unique identifier of the user' })
    _id: string;

    @ApiProperty({ description: 'The date when the user was created' })
    createdAt: Date;

    @ApiProperty({ description: 'The date when the user was last updated' })
    updatedAt: Date;
}
