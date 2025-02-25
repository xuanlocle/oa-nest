import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { CreateLocationDto } from '../create-location.dto/create-location.dto';

export class UpdateLocationDto extends PartialType(CreateLocationDto) {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    locationNumber?: string;

    @IsOptional()
    @IsNumber()
    area?: number;
}
