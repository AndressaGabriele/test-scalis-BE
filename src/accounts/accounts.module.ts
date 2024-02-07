import { Module } from '@nestjs/common';
import { AccountsController } from './controller/accounts.controller';
import { AccountsService } from './service/accounts.service';
import { AccountsSchemaModule } from './schemas/accounts.schema';

@Module({
  imports: [AccountsSchemaModule],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
