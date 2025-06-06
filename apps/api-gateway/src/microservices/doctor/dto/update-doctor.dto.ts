import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateDoctorDto } from './create-doctor.dto';

export class UpdateDoctorDto extends PartialType(
    OmitType(CreateDoctorDto, ['userId', 'email'] as const),
) {}
