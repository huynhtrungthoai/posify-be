import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PaymentMethod {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    store_code: string;

    @Column()
    card_number: string;

    @Column()
    card_name: string;

    @Column()
    card_bank: string;

    @Column()
    status: string;

    @Column()
    desc: string;
}
