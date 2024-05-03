import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../entities/transaction.entity';
import { CreateTransactionDto } from '../dto/create-transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiOperation({
    summary: 'Perform a transaction',
  })
  async create(@Body() request: CreateTransactionDto): Promise<any> {
    return await this.transactionService.create(request);
  }

  @Get()
  @ApiOperation({
    summary: 'Retreive transactions',
  })
  async getAll(): Promise<any> {
    return await this.transactionService.getAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retreive transaction',
  })
  async getById(@Param('id') id: string): Promise<Transaction> {
    return await this.transactionService.getById(id);
  }
}
