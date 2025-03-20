import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1742232779018 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "user" (username, password, role, id, email)
            VALUES ('admin', 'admin_password', 'admin', '1', admin@gmail.com)
        `);
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "name" RENAME TO "title"`);
    }
}
