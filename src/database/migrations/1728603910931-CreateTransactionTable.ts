import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTransactionTable1728603910930 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE IF NOT EXISTS transactions(
                id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
                title varchar NOT NULL,
                category_id uuid NOT NULL,
                user_id uuid NOT NULL,
                type varchar NOT NULL,
                value int NOT NULL,
                is_ignored boolean DEFAULT false,
                scheduled_at TIMESTAMP NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP NULL
            );`
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DROP TABLE IF EXISTS transactions`);
    }
}