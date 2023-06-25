import { MigrationInterface, QueryRunner } from 'typeorm';

export class WebApp1687716358868 implements MigrationInterface {
    name = 'WebApp1687716358868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "web_app" ("id" SERIAL NOT NULL, "domain" character varying NOT NULL, "accessToken" character varying NOT NULL, "info" character varying NOT NULL, CONSTRAINT "UQ_ea3301979165a71c54991d2f4af" UNIQUE ("domain"), CONSTRAINT "UQ_22117b4c203b6a91cac7533b33f" UNIQUE ("accessToken"), CONSTRAINT "PK_0e30ad2e877a0842ff6fa81cba5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "web_app"`);
    }

}
