import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../entities/account.entity';
import { CreateAccountDto } from '../dto/create-account.dto';
import { AccountExsistsExpection } from '../exceptions/account-exsists.exception';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async getById(account_id: string) {
    return await this.accountRepository.findOneBy({ account_id });
  }

  async create(request: CreateAccountDto) {
    const { account_id } = request;
    const querybuilder = this.accountRepository
      .createQueryBuilder('accounts')
      .where('accounts.account_id = :account_id', {
        account_id,
      });

    if (await querybuilder.getOne()) {
      throw new AccountExsistsExpection();
    }

    const account = new Account();
    account.account_id = account_id;
    account.balance = 0;

    await this.accountRepository.save(account);

    return account;
  }

  async update(account: Account) {
    return await this.accountRepository.save(account);
  }
}
