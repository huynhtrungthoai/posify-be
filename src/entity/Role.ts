import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum TypeRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    code: string;

    @Column()
    desc: string;
}
