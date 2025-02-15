import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDbSchema1739447589554 implements MigrationInterface {
    name = 'InitDbSchema1739447589554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`items\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`icon\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`folderId\` bigint NULL, \`userId\` bigint NULL, INDEX \`IDX_02c9c7f4f86c3628ba6ec2e02b\` (\`created_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`folders\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`state\` enum ('open', 'closed') NOT NULL DEFAULT 'closed', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` bigint NULL, INDEX \`IDX_2cb3b5101e35ccd5b03a36b68c\` (\`created_at\`), UNIQUE INDEX \`IDX_276815e9fa9e4ddac7810288bf\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`isActive\` tinyint(1) NULL DEFAULT 1, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_51b8b26ac168fbe7d6f5653e6c\` (\`name\`), INDEX \`IDX_c9b5b525a96ddc2c5647d7f7fa\` (\`created_at\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_sessions\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`token\` varchar(255) NOT NULL, \`expiry\` datetime NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` bigint NULL, INDEX \`IDX_ff5db00dec0f61218cd0d468df\` (\`token\`), INDEX \`IDX_c21371bff3fc5d8ec9c828ab65\` (\`expiry\`), INDEX \`IDX_3c7d38f304121da68fb6b04c01\` (\`created_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`items\` ADD CONSTRAINT \`FK_e66a836652956c0395453017e2e\` FOREIGN KEY (\`folderId\`) REFERENCES \`folders\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`items\` ADD CONSTRAINT \`FK_40e681891fea5a4b3c5c2546d15\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`folders\` ADD CONSTRAINT \`FK_5caa05c855e82b975c8c438cf68\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_sessions\` ADD CONSTRAINT \`FK_55fa4db8406ed66bc7044328427\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_sessions\` DROP FOREIGN KEY \`FK_55fa4db8406ed66bc7044328427\``);
        await queryRunner.query(`ALTER TABLE \`folders\` DROP FOREIGN KEY \`FK_5caa05c855e82b975c8c438cf68\``);
        await queryRunner.query(`ALTER TABLE \`items\` DROP FOREIGN KEY \`FK_40e681891fea5a4b3c5c2546d15\``);
        await queryRunner.query(`ALTER TABLE \`items\` DROP FOREIGN KEY \`FK_e66a836652956c0395453017e2e\``);
        await queryRunner.query(`DROP INDEX \`IDX_3c7d38f304121da68fb6b04c01\` ON \`user_sessions\``);
        await queryRunner.query(`DROP INDEX \`IDX_c21371bff3fc5d8ec9c828ab65\` ON \`user_sessions\``);
        await queryRunner.query(`DROP INDEX \`IDX_ff5db00dec0f61218cd0d468df\` ON \`user_sessions\``);
        await queryRunner.query(`DROP TABLE \`user_sessions\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_c9b5b525a96ddc2c5647d7f7fa\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_51b8b26ac168fbe7d6f5653e6c\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_276815e9fa9e4ddac7810288bf\` ON \`folders\``);
        await queryRunner.query(`DROP INDEX \`IDX_2cb3b5101e35ccd5b03a36b68c\` ON \`folders\``);
        await queryRunner.query(`DROP TABLE \`folders\``);
        await queryRunner.query(`DROP INDEX \`IDX_02c9c7f4f86c3628ba6ec2e02b\` ON \`items\``);
        await queryRunner.query(`DROP TABLE \`items\``);
    }

}
