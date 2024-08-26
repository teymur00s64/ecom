import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddUserAge1724680016194 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.addColumn('user', new TableColumn({
            name: 'age',
            type: 'integer'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
