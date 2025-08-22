import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
} from 'class-validator';

export class RefundPaymentDto {
    @ApiProperty({
        description: 'The ID of the payment to be refunded',
        example: 'pi_123456789',
    })
    @IsString()
    @IsNotEmpty()
    paymentIntentId: string;

    @ApiProperty({
        description: 'The ID of the appointment associated with the payment',
        example: 1,
    })
    @IsNumber()
    @IsNotEmpty()
    appointmentId: number;

    @ApiProperty({
        description: 'The amount to refund in cents',
        example: 1000,
        required: false,
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    amount?: number;

    @ApiProperty({
        description: 'The reason for the refund',
        example: 'requested_by_customer',
        required: false,
    })
    @IsString()
    @IsOptional()
    reason?: string;

    @ApiProperty({
        description: 'An optional idempotency key for the refund request',
        example: 'unique-idempotency-key-12345',
        required: false,
    })
    @IsString()
    @IsOptional()
    idempotencyKey?: string;
}
