import { MigrationInterface, QueryRunner } from 'typeorm';

export class Role1742877995934 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "role" (name, code, "desc")
            VALUES 
                ('Admin', 'ADMIN', 'Admin role'),
                ('Manager', 'MANAGER', 'Manager role'),
                ('Employee', 'EMPLOYEE', 'Employee role');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
