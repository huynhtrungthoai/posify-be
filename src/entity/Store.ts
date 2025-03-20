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
    logo_url: string;

    @Column()
    cover_url: string;

    @Column()
    desc: string;
}
