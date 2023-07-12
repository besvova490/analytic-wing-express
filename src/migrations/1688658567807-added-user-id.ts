import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedUserId1688658567807 implements MigrationInterface {
    name = 'AddedUserId1688658567807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "UQ_01cd2b829e0263917bf570cb672" UNIQUE ("userId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "UQ_01cd2b829e0263917bf570cb672"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "userId"`);
    }

}
