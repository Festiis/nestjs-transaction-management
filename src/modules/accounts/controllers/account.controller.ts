import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AccountService } from '../services/account.service';
import { CreateAccountDto } from '../dto/create-account.dto';
import { Account } from '../entities/account.entity';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiOperation({
    summary: 'Register a new account',
  })
  async create(@Body() request: CreateAccountDto) {
    await this.accountService.create(request);

    return {
      success: true,
      message: 'The process was completed successfully',
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retreive account',
  })
  async getById(@Param('id') id: string): Promise<Account> {
    return await this.accountService.getById(id);
  }
}
