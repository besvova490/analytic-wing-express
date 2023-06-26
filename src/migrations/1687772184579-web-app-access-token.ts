import { MigrationInterface, QueryRunner } from "typeorm";

export class WebAppAccessToken1687772184579 implements MigrationInterface {
    name = 'WebAppAccessToken1687772184579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "web_app" DROP CONSTRAINT "UQ_22117b4c203b6a91cac7533b33f"`);
        await queryRunner.query(`ALTER TABLE "web_app" DROP COLUMN "accessToken"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "web_app" ADD "accessToken" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "web_app" ADD CONSTRAINT "UQ_22117b4c203b6a91cac7533b33f" UNIQUE ("accessToken")`);
    }

}
