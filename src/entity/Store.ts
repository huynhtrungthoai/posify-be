import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Store {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    code: string;

    @Column()
    hotline: string;

    @Column()
    address: string;

    @Column()
    is_main: boolean;

    @Column()
    status: string;

    @Column()
    logo_url: string;

    @Column()
    banner_url: string;

    @Column()
    website_url: string;

    @Column()
    desc: string;
}
