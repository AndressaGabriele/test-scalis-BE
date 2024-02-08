import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { InMemoryDBModule } from './in-memory-db.module';

@Module({
  imports: [InMemoryDBModule, AccountsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
