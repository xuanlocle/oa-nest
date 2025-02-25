import { Entity, Column, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from 'typeorm';

@Entity('locations')
@Tree('closure-table')
export class Location {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ name:'location_number', type: 'varchar', length: 255, unique: true })
    locationNumber: string;

    @Column({ type: 'float' })
    area: number;

    @TreeParent()
    parent: Location | null;

    @TreeChildren()
    children: Location[];
}
