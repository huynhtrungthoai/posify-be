import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum RoleEnumType {
    USER = 'user',
    ADMIN = 'admin',
}

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    sku: string;

    @Column()
    is_ingredient: string;

    @Column()
    desc: string;

    @Column()
    image_url: string;

    @Column()
    cost: string;

    @Column()
    price: string;

    @Column()
    inventory: string;

    @Column()
    type: string;
}
