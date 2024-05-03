import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Account } from 'src/modules/accounts/entities/account.entity';
import { Transaction } from 'src/modules/transactions/entities/transaction.entity';

dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`Config error missing env ${key}`);
    }

    return value;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'sqlite',
      database: this.getValue('DB_DATABASE'),
      entities: [Account, Transaction],
      synchronize: true,
    };
  }
}

const configService = new ConfigService(process.env);
export { configService };
