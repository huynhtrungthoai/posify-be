import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum TypeStoreStatus {
    ACTIVE = 'ACTIVE',
    IN_ACTIVE = 'IN_ACTIVE',
    EXPIRED = 'EXPIRED',
    DELETED = 'DELETED',
    BLOCKED = 'BLOCKED',
}

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

    @Column({
        type: 'enum',
        enum: TypeStoreStatus,
        default: TypeStoreStatus.ACTIVE,
    })
    status: TypeStoreStatus.ACTIVE;

    @Column()
    logo_url: string;

    @Column()
    banner_url: string;

    @Column()
    website_url: string;

    @Column()
    desc: string;

    @Column()
    user_id: string;
}
