import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AccountsService } from '../service/accounts.service';
import { Account } from '../entities/account.entity';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  async create(
    @Body()
    createAccountDto: {
      userName: string;
      checking: number;
      savings: number;
    },
  ): Promise<Account> {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  async findAll(): Promise<Account[]> {
    return this.accountsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Account> {
    return this.accountsService.findOne(id);
  }

  @Post('transfer')
  async transferFunds(
    @Body()
    transferDto: {
      fromUserName: string;
      toUserName: string;
      amount: number;
    },
  ): Promise<{ message: string }> {
    return this.accountsService.transferFunds(transferDto);
  }
}
