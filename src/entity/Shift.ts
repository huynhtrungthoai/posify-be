import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Shift {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', { array: true })
    working_day_ids: string[];

    @Column()
    store_code: string;

    @Column()
    user_id: string;

    @Column()
    desc: string;
}
