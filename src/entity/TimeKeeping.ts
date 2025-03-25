import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TimeKeeping {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    check_in: string;

    @Column()
    check_out: string;

    @Column()
    user_id: string;

    @Column()
    desc: string;

    @Column()
    store_code: string;
}
