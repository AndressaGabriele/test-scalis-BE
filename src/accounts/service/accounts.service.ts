import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async create(createAccountDto: {
    userName: string;
    checking: number;
    savings: number;
  }): Promise<Account> {
    const account = this.accountRepository.create(createAccountDto);
    return this.accountRepository.save(account);
  }

  async findAll(): Promise<Account[]> {
    return this.accountRepository.find();
  }

  async findOne(id: number): Promise<Account> {
    const account = await this.accountRepository.findOneBy({ id });
    if (!account) {
      throw new NotFoundException(`Account with ID "${id}" not found`);
    }
    return account;
  }

  async transferFunds(transferDto: {
    fromUserName: string;
    toUserName: string;
    amount: number;
  }): Promise<{ message: string }> {
    const fromAccount = await this.accountRepository.findOneBy({
      userName: transferDto.fromUserName,
    });
    const toAccount = await this.accountRepository.findOneBy({
      userName: transferDto.toUserName,
    });

    if (!fromAccount || !toAccount) {
      throw new NotFoundException('One or both accounts not found');
    }

    if (transferDto.amount <= 0) {
      throw new Error('Invalid transfer amount');
    }

    if (fromAccount.checking >= transferDto.amount) {
      fromAccount.checking -= transferDto.amount;
      toAccount.checking += transferDto.amount;
    } else {
      throw new Error('Insufficient funds');
    }

    await this.accountRepository.save(fromAccount);
    await this.accountRepository.save(toAccount);

    return { message: 'Transfer successful' };
  }
}
