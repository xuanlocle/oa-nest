import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Like, TreeRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/locations.entities';
import { CreateLocationDto } from './dto/create-location.dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto/update-location.dto';

@Injectable()
export class LocationsService {

    constructor(
        @InjectRepository(Location)
        private readonly locationRepository: TreeRepository<Location>,
    ) { }


    async create(dto: CreateLocationDto): Promise<Location> {
        // Check if locationNumber already exists
        const existingLocation = await this.locationRepository.findOne({ where: { locationNumber: dto.locationNumber } });
        if (existingLocation) {
            throw new ConflictException(`Location number "${dto.locationNumber}" already exists`);
        }

        const location = this.locationRepository.create(dto);

        // Infer the parent location by extracting the parent locationNumber
        const parentLocationNumber = this.getParentLocationNumber(dto.locationNumber);
        if (parentLocationNumber) {
            const parent = await this.locationRepository.findOne({
                where: { locationNumber: parentLocationNumber },
            });

            if (!parent) {
                throw new NotFoundException(`Parent location ${parentLocationNumber} not found`);
            }

            location.parent = parent;
        }

        try {
            return await this.locationRepository.save(location);
        } catch (error) {
            throw new BadRequestException(`Failed to create location: ${error.message}`);
        }
    }

    /**
     * Extracts parent location number by removing the last segment.
     * Example: "A-01-01-M1" to Parent: "A-01-01"
     */
    private getParentLocationNumber(locationNumber: string): string | null {
        const segments = locationNumber.split('-');
        if (segments.length > 1) {
            return segments.slice(0, -1).join('-'); // Remove last part to get parent
        }
        return null; // No parent for root locations
    }

    async getTree(): Promise<Location[]> {
        return await this.locationRepository.findTrees();
    }

    async findOne(id: number): Promise<Location> {
        const location = await this.locationRepository.findOne({ where: { id }, relations: ['parent', 'children'] });
        if (!location) throw new NotFoundException(`Location with ID ${id} not found`);
        return location;
    }

    async findByBuilding(buildingCode: string): Promise<Location[]> {
        return this.locationRepository.find({
            where: { locationNumber: Like(`${buildingCode}-%`) },
        });
    }

    /**
     * Extracts the first part of `locationNumber` as the "building".
     */
    getBuildingCode(locationNumber: string): string {
        return locationNumber.split('-')[0]; // Extract first segment (e.g., "A" from "A-01-01")
    }

    async update(id: number, dto: UpdateLocationDto): Promise<Location> {
        const location = await this.findOne(id); // Ensure location exists

        if (dto.name) {
            location.name = dto.name;
        }

        if (dto.area) {
            location.area = dto.area;
        }

        // If locationNumber is changing, update it and reassign parent
        if (dto.locationNumber && dto.locationNumber !== location.locationNumber) {
            // Check if new locationNumber is already used
            const existing = await this.locationRepository.findOne({ where: { locationNumber: dto.locationNumber } });
            if (existing) {
                throw new ConflictException(`Location number "${dto.locationNumber}" is already in use`);
            }

            location.locationNumber = dto.locationNumber;

            // Recalculate parent based on new locationNumber
            const parentLocationNumber = this.getParentLocationNumber(dto.locationNumber);
            if (parentLocationNumber) {
                const parent = await this.locationRepository.findOne({ where: { locationNumber: parentLocationNumber } });

                if (!parent) {
                    throw new NotFoundException(`Parent location ${parentLocationNumber} not found`);
                }

                location.parent = parent;
            } else {
                location.parent = null; // No parent, it's a root location
            }
        }

        try {
            return await this.locationRepository.save(location);
        } catch (error) {
            throw new BadRequestException(`Failed to update location: ${error.message}`);
        }
    }

    async remove(id: number): Promise<{ message: string }> {
        const location = await this.findOne(id); // Ensure location exists

        // Check if location has children
        const children = await this.locationRepository.find({ where: { parent: location } });

        if (children.length > 0) {
            throw new ConflictException(`Cannot delete location ${location.locationNumber} because it has child locations`);
        }


        try {
            await this.locationRepository.remove(location);
            return { message: `Location ${location.locationNumber} deleted successfully` };
        } catch (error) {
            throw new BadRequestException(`Failed to remove location: ${error.message}`);
        }
    }
}

