import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WorkingDay {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string;

    @Column()
    shift_id: string;

    @Column()
    date: string;
}
