import { MigrationInterface, QueryRunner } from 'typeorm';
import * as _bcrypt from 'bcryptjs';
import { TypeRole } from '../entity/Role';

export class User1742232779018 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        const adminPassword = await _bcrypt.hash('admin123', 12);

        await queryRunner.query(`
            INSERT INTO "user" (name, email, password, role, verified, avatar_url, phone, store_codes, role_codes, created_at, updated_at)
            VALUES 
                ('Admin', 'admin@example.com', '${adminPassword}', '${TypeRole.ADMIN}', true, '', '1234567890', '{}', '{}', NOW(), NOW());
        `);
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "user" WHERE email = 'admin@example.com';
        `);
    }
}
