import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Transaction } from 'src/modules/transactions/entities/transaction.entity';
import { DecimalColumnTransformer } from 'src/modules/app/transformers/decimalColumn.transformer';
import { EntityBase } from '../../app/abstracts/entity.base';

@Entity('accounts')
export class Account extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  account_id: string;

  @Column('decimal', {
    default: 0,
    transformer: new DecimalColumnTransformer(),
  })
  balance: number;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];
}
