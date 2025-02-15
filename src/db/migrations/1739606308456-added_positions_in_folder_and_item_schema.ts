import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedPositionsInFolderAndItemSchema1739606308456 implements MigrationInterface {
    name = 'AddedPositionsInFolderAndItemSchema1739606308456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`items\` ADD \`position\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`folders\` ADD \`position\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`folders\` DROP COLUMN \`position\``);
        await queryRunner.query(`ALTER TABLE \`items\` DROP COLUMN \`position\``);
    }

}
