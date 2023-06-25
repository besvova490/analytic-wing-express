import { MigrationInterface, QueryRunner } from "typeorm";

export class True1687718173026 implements MigrationInterface {
    name = 'True1687718173026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "web_app" ADD "userProfileId" integer`);
        await queryRunner.query(`ALTER TABLE "web_app" ADD CONSTRAINT "FK_7c6c07502e3fc59c02009a875e1" FOREIGN KEY ("userProfileId") REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "web_app" DROP CONSTRAINT "FK_7c6c07502e3fc59c02009a875e1"`);
        await queryRunner.query(`ALTER TABLE "web_app" DROP COLUMN "userProfileId"`);
    }

}
