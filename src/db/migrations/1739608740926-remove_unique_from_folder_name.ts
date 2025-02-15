import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUniqueFromFolderName1739608740926 implements MigrationInterface {
    name = 'RemoveUniqueFromFolderName1739608740926'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_276815e9fa9e4ddac7810288bf\` ON \`folders\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_276815e9fa9e4ddac7810288bf\` ON \`folders\` (\`name\`)`);
    }

}
