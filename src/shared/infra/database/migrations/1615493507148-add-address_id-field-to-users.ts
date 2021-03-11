import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class addAddressIdFieldToUsers1615493507148
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'address_id',
        type: 'uuid',
        isNullable: true,
        default: null,
      })
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        name: 'UserAddress',
        columnNames: ['address_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'addresses',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'UserAddress');
    await queryRunner.dropColumn('users', 'address_id');
  }
}
