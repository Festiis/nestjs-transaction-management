import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { PingController } from './controllers/ping.controller';
import { PingService } from './services/ping.service';
import { AccountsModule } from '../accounts/accounts.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { configService } from './services/config.service';

@Module({
  imports: [
    AccountsModule,
    TransactionsModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
  controllers: [AppController, PingController],
  providers: [AppService, PingService],
})
export class AppModule {}
