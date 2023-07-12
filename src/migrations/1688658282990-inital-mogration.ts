import { MigrationInterface, QueryRunner } from "typeorm";

export class InitalMogration1688658282990 implements MigrationInterface {
    name = 'InitalMogration1688658282990'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_profile" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "avatar" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e336cc51b61c40b1b1731308aa5" UNIQUE ("email"), CONSTRAINT "PK_f44d0cd18cfd80b0fed7806c3b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "web_app" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "preview" character varying, "title" character varying NOT NULL, "metaTitle" character varying NOT NULL, "accessToken" character varying NOT NULL, "info" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userProfileId" integer, CONSTRAINT "UQ_1baf6ce598f76578b6fb2f9fc2a" UNIQUE ("url"), CONSTRAINT "PK_0e30ad2e877a0842ff6fa81cba5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."event_event_enum" AS ENUM('click', 'page_view')`);
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "event" "public"."event_event_enum" NOT NULL, "country" character varying NOT NULL, "page" character varying NOT NULL, "isMobile" boolean NOT NULL DEFAULT false, "browserInfo" character varying, "data" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "webAppId" integer, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "web_app" ADD CONSTRAINT "FK_7c6c07502e3fc59c02009a875e1" FOREIGN KEY ("userProfileId") REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_71882d16983564a404ed385d119" FOREIGN KEY ("webAppId") REFERENCES "web_app"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_71882d16983564a404ed385d119"`);
        await queryRunner.query(`ALTER TABLE "web_app" DROP CONSTRAINT "FK_7c6c07502e3fc59c02009a875e1"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TYPE "public"."event_event_enum"`);
        await queryRunner.query(`DROP TABLE "web_app"`);
        await queryRunner.query(`DROP TABLE "user_profile"`);
    }

}
