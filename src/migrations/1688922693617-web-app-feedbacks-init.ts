import { MigrationInterface, QueryRunner } from "typeorm";

export class WebAppFeedbacksInit1688922693617 implements MigrationInterface {
    name = 'WebAppFeedbacksInit1688922693617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "wep_app_feedback" ("id" SERIAL NOT NULL, "userId" character varying NOT NULL, "feedback" character varying NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "webAppId" integer, CONSTRAINT "UQ_1137d322f9d4c86bb315753c336" UNIQUE ("userId"), CONSTRAINT "PK_3f0717795dc6198b03a011360ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "wep_app_feedback" ADD CONSTRAINT "FK_448fcfbd5058bac1ac82b03b0df" FOREIGN KEY ("webAppId") REFERENCES "web_app"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wep_app_feedback" DROP CONSTRAINT "FK_448fcfbd5058bac1ac82b03b0df"`);
        await queryRunner.query(`DROP TABLE "wep_app_feedback"`);
    }

}
