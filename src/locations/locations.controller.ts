import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto/update-location.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Location } from './entities/locations.entities';

@Controller('locations')
export class LocationsController {
    constructor(private readonly locationsService: LocationsService) { }

    @Post()
    @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true }))
    @ApiOperation({ summary: 'Create a new location' })
    @ApiResponse({ status: 201, description: 'Location created successfully', type: Location })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    @ApiResponse({ status: 409, description: ' Location number conflict' })
    @ApiResponse({ status: 404, description: ' Location number is child but not found parent to create' })
    create(@Body() dto: CreateLocationDto) {
        return this.locationsService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all buildings' })
    @ApiResponse({ status: 200, description: 'Returns all locations as a tree', type: [Location] })
    getTree() {
        return this.locationsService.getTree();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get specific location by id' })
    @ApiResponse({ status: 200, description: 'Location found', type: Location })
    @ApiResponse({ status: 404, description: 'Location not found' })
    findOne(@Param('id') id: number) {
        return this.locationsService.findOne(id);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true }))
    @ApiOperation({ summary: 'Update a location' })
    @ApiResponse({ status: 200, description: 'Location updated successfully', type: Location })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    @ApiResponse({ status: 404, description: 'Location not found' })
    @ApiResponse({ status: 409, description: 'Location number is conflict' })
    update(@Param('id') id: number, @Body() dto: UpdateLocationDto) {
        return this.locationsService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a location' })
    @ApiResponse({ status: 200, description: 'Location deleted successfully' })
    @ApiResponse({ status: 404, description: 'Location not found' })
    remove(@Param('id') id: number) {
        return this.locationsService.remove(id);
    }
}
