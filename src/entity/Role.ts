import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum RoleEnumType {
    USER = 'user',
    ADMIN = 'admin',
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
