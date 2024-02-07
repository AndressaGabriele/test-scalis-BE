import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountDocument } from '../schemas/accounts.model';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) {}

  async create(createAccountDto: {
    userName: string;
    checking: number;
    savings: number;
  }): Promise<Account> {
    const createdAccount = new this.accountModel(createAccountDto);
    return createdAccount.save();
  }

  async findAll(): Promise<Account[]> {
    return this.accountModel.find().exec();
  }

  // Updated to use ID for finding an account
  async findOne(id: string): Promise<Account> {
    const account = await this.accountModel.findById(id).exec();
    if (!account) {
      throw new NotFoundException(`Account with ID "${id}" not found`);
    }
    return account;
  }

  // Updated to use ID and adjusted logic for transferring funds
  async transferFunds(transferDto: {
    from: string;
    to: string;
    amount: number;
    userId: string;
  }): Promise<{ message: string }> {
    const account = await this.accountModel.findById(transferDto.userId).exec();

    if (!account) {
      throw new Error('Account not found');
    }

    const { from, amount } = transferDto;

    if (isNaN(amount) || amount <= 0) {
      throw new Error('Invalid transfer amount');
    }

    if (from === 'checking' && account.checking >= amount) {
      account.checking -= amount;
      account.savings += amount;
    } else if (from === 'savings' && account.savings >= amount) {
      account.savings -= amount;
      account.checking += amount;
    } else {
      throw new Error('Insufficient funds');
    }

    await account.save();

    return { message: 'Transfer successful' };
  }
}
