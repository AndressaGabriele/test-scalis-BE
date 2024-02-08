import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { AccountsService } from '../service/accounts.service';

describe('AccountsController', () => {
  let controller: AccountsController;
  let service: AccountsService;

  beforeEach(async () => {
    // Mock AccountsService
    const mockAccountsService = {
      create: jest.fn((dto) => {
        return {
          id: Date.now(),
          ...dto,
        };
      }),
      findAll: jest.fn(() => {
        return [];
      }),
      findOne: jest.fn((id) => {
        return {
          id,
          userName: 'testUser',
          checking: 100,
          savings: 100,
        };
      }),
      transferFunds: jest.fn((dto) => {
        return { message: 'Transfer successful' };
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [
        {
          provide: AccountsService,
          useValue: mockAccountsService,
        },
      ],
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
    service = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully create an account', async () => {
      const createAccountDto = {
        userName: 'testUser',
        checking: 100,
        savings: 100,
      };
      expect(await controller.create(createAccountDto)).toEqual({
        id: expect.any(Number),
        ...createAccountDto,
      });
      expect(service.create).toHaveBeenCalledWith(createAccountDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of accounts', async () => {
      expect(await controller.findAll()).toEqual([]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should return a single account', async () => {
      const result = await controller.findOne(1);
      expect(result).toEqual({
        id: 1,
        userName: 'testUser',
        checking: 100,
        savings: 100,
      });
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('transferFunds()', () => {
    it('should transfer funds and return a success message', async () => {
      const transferDto = {
        fromUserName: 'user1',
        toUserName: 'user2',
        amount: 50,
      };
      expect(await controller.transferFunds(transferDto)).toEqual({
        message: 'Transfer successful',
      });
      expect(service.transferFunds).toHaveBeenCalledWith(transferDto);
    });
  });
});
