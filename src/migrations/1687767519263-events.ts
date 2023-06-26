import { MigrationInterface, QueryRunner } from "typeorm";

export class Events1687767519263 implements MigrationInterface {
    name = 'Events1687767519263'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."event_event_enum" AS ENUM('click', 'page_view')`);
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "event" "public"."event_event_enum" NOT NULL, "data" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "webAppId" integer, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "web_app" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "web_app" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_71882d16983564a404ed385d119" FOREIGN KEY ("webAppId") REFERENCES "web_app"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_71882d16983564a404ed385d119"`);
        await queryRunner.query(`ALTER TABLE "web_app" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "web_app" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "createdAt"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TYPE "public"."event_event_enum"`);
    }

}
