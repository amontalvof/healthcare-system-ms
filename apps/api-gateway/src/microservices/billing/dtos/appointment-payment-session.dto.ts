import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    ArrayMinSize,
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    ValidateNested,
} from 'class-validator';

export class AppointmentPaymentSessionItemDto {
    @ApiProperty({
        description: 'The ID of the appointment',
        example: 123,
    })
    @IsNumber()
    @IsPositive()
    appointmentId: number;

    @ApiProperty({
        description: 'The date of the appointment',
        example: '2023-10-01',
    })
    @IsString()
    @IsNotEmpty()
    date: string;

    @ApiProperty({
        description: 'The start time of the appointment',
        example: '10:00:00',
    })
    @IsString()
    @IsNotEmpty()
    startTime: string;

    @ApiProperty({
        description: 'The end time of the appointment',
        example: '10:59:00',
    })
    @IsString()
    @IsNotEmpty()
    endTime: string;

    @ApiProperty({
        description: 'The name of the doctor for the appointment',
        example: 'Dr. John Doe',
    })
    @IsString()
    @IsNotEmpty()
    doctorName: string;

    @ApiProperty({
        description: 'The degree of the doctor for the appointment',
        example: 'MD',
    })
    @IsString()
    @IsNotEmpty()
    doctorDegree: string;

    @ApiProperty({
        description: 'The name of the patient for the appointment',
        example: 'Jane Smith',
    })
    @IsString()
    @IsNotEmpty()
    patientName: string;

    @ApiProperty({
        description: 'The price of the appointment',
        example: 100.25,
    })
    @IsNumber()
    @IsPositive()
    price: number;

    @ApiProperty({
        description: 'The quantity of the appointment item',
        example: 1,
    })
    @IsNumber()
    @IsPositive()
    quantity: number;
}

export class AppointmentPaymentSessionDto {
    @ApiProperty({
        description: 'The currency for the payment session',
        example: 'usd',
    })
    @IsString()
    @IsNotEmpty()
    currency: string;

    @ApiProperty({
        description: 'List of appointment items for the payment session',
        type: [AppointmentPaymentSessionItemDto],
    })
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => AppointmentPaymentSessionItemDto)
    items: AppointmentPaymentSessionItemDto[];
}
