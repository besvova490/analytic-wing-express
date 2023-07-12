import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedUserId1688658718174 implements MigrationInterface {
    name = 'AddedUserId1688658718174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "UQ_01cd2b829e0263917bf570cb672"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "UQ_01cd2b829e0263917bf570cb672" UNIQUE ("userId")`);
    }

}
