import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Account } from '../entities/account.entity';
import { AccountsService } from './accounts.service';

describe('AccountsService', () => {
  let service: AccountsService;
  let repo: Repository<Account>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: getRepositoryToken(Account),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
    repo = module.get<Repository<Account>>(getRepositoryToken(Account));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully create an account', async () => {
      const newAccount = { userName: 'testUser', checking: 100, savings: 100 };
      repo.create.mockReturnValue(newAccount);
      repo.save.mockResolvedValue(newAccount);

      expect(await service.create(newAccount)).toEqual(newAccount);
      expect(repo.create).toHaveBeenCalledWith(newAccount);
      expect(repo.save).toHaveBeenCalledWith(newAccount);
    });
  });

  describe('findAll()', () => {
    it('should return an empty array of accounts', async () => {
      const accounts = [];
      repo.find.mockResolvedValue(accounts);

      expect(await service.findAll()).toEqual(accounts);
      expect(repo.find).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should return an account if it exists', async () => {
      const id = 1;
      const expectedAccount = {
        id,
        userName: 'testUser',
        checking: 100,
        savings: 100,
      };
      repo.findOne.mockResolvedValue(expectedAccount);

      await expect(service.findOne(id)).resolves.toEqual(expectedAccount);
      expect(repo.findOne).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException if the account does not exist', async () => {
      const id = 999; // assuming this id does not exist
      repo.findOne.mockResolvedValue(null);

      await expect(service.findOne(id)).rejects.toThrow(
        new NotFoundException(`Account with ID "${id}" not found`),
      );
    });
  });

  describe('transferFunds()', () => {
    it('should successfully transfer funds between accounts', async () => {
      const fromAccount = {
        id: 1,
        userName: 'fromUser',
        checking: 500,
        savings: 100,
      };
      const toAccount = {
        id: 2,
        userName: 'toUser',
        checking: 100,
        savings: 200,
      };

      repo.findOne
        .mockResolvedValueOnce(fromAccount)
        .mockResolvedValueOnce(toAccount);
      repo.save.mockResolvedValue({}); // Simulando sucesso ao salvar

      const transferDto = {
        fromUserName: 'fromUser',
        toUserName: 'toUser',
        amount: 50,
      };
      const result = await service.transferFunds(transferDto);

      expect(result).toEqual({ message: 'Transfer successful' });
      expect(repo.save).toHaveBeenCalledTimes(2); // Verifica se save foi chamado duas vezes, uma para cada conta
    });
  });
});
