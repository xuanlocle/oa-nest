import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateLocationDto {

    @ApiProperty({ example: 'Lobby Level 1', description: 'Name of the location' })
    @IsString()
    @IsNotEmpty({ message: 'Location name is required' })
    name: string;

    @ApiProperty({ example: 'A-01-Lobby', description: 'Unique location number' })
    @IsString()
    @IsNotEmpty({ message: 'Location number is required' })
    locationNumber: string;

    @ApiProperty({ example: 80.62, description: 'Area of the location in square meters' })
    @IsNumber()
    @Min(0, { message: 'Area must be a positive number' })
    area: number;

}