import { MigrationInterface, QueryRunner } from "typeorm";

export class WebAppSelectors1689622309464 implements MigrationInterface {
    name = 'WebAppSelectors1689622309464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "web_app_selector" ("id" SERIAL NOT NULL, "selector" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "webAppId" integer, CONSTRAINT "PK_13108891914ca73260a1a4bab4a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "web_app_selector" ADD CONSTRAINT "FK_9e85dab2ade7586f5e0829ad394" FOREIGN KEY ("webAppId") REFERENCES "web_app"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "web_app_selector" DROP CONSTRAINT "FK_9e85dab2ade7586f5e0829ad394"`);
        await queryRunner.query(`DROP TABLE "web_app_selector"`);
    }

}
