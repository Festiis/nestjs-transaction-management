import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountService } from 'src/modules/accounts/services/account.service';
import { Transaction } from '../entities/transaction.entity';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { TransactionNotFoundException } from '../exceptions/transaction-not-found.exception';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private accountService: AccountService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<any> {
    const { account_id, amount } = createTransactionDto;

    let account = await this.accountService.getById(account_id);

    if (!account) {
      account = await this.accountService.create({ account_id });
    }

    const transaction = new Transaction();
    transaction.account_id = account_id;
    transaction.amount = amount;

    await this.transactionRepository.save(transaction);

    account.balance = Number(account.balance) + amount;
    await this.accountService.update(account);

    return { ...transaction, ...account };
  }

  async getById(transactionId: string): Promise<Transaction> {
    const transaction = await this.transactionRepository
      .createQueryBuilder('transactions')
      .where('transactions.transaction_id = :transactionId', { transactionId })
      .getOne();

    if (!transaction) {
      throw new TransactionNotFoundException(); // Throw custom exception if transaction is not found
    }
    return transaction;
  }

  async getAll(): Promise<Transaction[]> {
    return this.transactionRepository.find();
  }
}
