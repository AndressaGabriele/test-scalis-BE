import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { InMemoryDBModule } from './in-memory-db.module';

@Module({
  imports: [InMemoryDBModule, AccountsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
