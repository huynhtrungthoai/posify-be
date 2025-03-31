import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import * as _bcrypt from 'bcryptjs';
import * as _crypto from 'crypto';
import { TypeRole } from './Role';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Index('email_index')
    @Column({ unique: true, type: 'varchar' })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({
        type: 'enum',
        enum: TypeRole,
        default: TypeRole.USER,
    })
    role: TypeRole.USER;

    @Column({ type: 'boolean', default: false })
    verified: boolean;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    avatar_url: string;

    @Column({ length: 11, type: 'varchar' })
    phone: string;

    @Column({ type: 'simple-array' })
    store_codes: string[];

    @Column({ type: 'simple-array' })
    role_codes: string[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    static async hashPassword(password: string) {
        return await _bcrypt.hash(password, 12);
    }

    static async comparePasswords(candidatePassword: string, hashedPassword: string) {
        return await _bcrypt.compare(candidatePassword, hashedPassword);
    }

    static createVerificationCode() {
        const verificationCode = _crypto.randomBytes(32).toString('hex');
        const hashedVerificationCode = _crypto.createHash('sha256').update(verificationCode).digest('hex');
        return { verificationCode, hashedVerificationCode };
    }
}
