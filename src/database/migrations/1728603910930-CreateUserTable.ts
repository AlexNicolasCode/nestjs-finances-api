import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateUserTable1728603910930 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE IF NOT EXISTS users(
                id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
                email varchar NOT NULL,
                password varchar NOT NULL
            );`
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DROP TABLE IF EXISTS users`);
    }
}