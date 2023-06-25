import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserProfile1687715901818 implements MigrationInterface {
    name = 'UserProfile1687715901818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_profile" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "avatar" character varying NOT NULL, CONSTRAINT "UQ_e336cc51b61c40b1b1731308aa5" UNIQUE ("email"), CONSTRAINT "PK_f44d0cd18cfd80b0fed7806c3b7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_profile"`);
    }

}
