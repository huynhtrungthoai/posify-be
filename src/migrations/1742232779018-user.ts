import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1742232779018 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {}

    async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "name" RENAME TO "title"`);
    }
}
