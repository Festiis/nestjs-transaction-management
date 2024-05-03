import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Account } from 'src/modules/accounts/entities/account.entity';
import { DecimalColumnTransformer } from 'src/modules/app/transformers/decimalColumn.transformer';
import { EntityBase } from '../../app/abstracts/entity.base';

@Entity('transactions')
export class Transaction extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  transaction_id: string;

  @Column('uuid')
  account_id: string;

  @Column('decimal', {
    transformer: new DecimalColumnTransformer(),
  })
  amount: number;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Account, (account) => account.transactions)
  @JoinColumn({ name: 'account_id' })
  account: Account;
}
