import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { LoggingModule } from './logging/logging.module';
import { UserModule } from './orm/user/user.module';
import { ItemModule } from './orm/item/item.module';
import { ReceiptModule } from './orm/receipt/receipt.module';
import { AuthModule } from './api/auth/auth.module';
import { ItemApiModule } from './api/item-api/item-api.module';
import { ReceiptApiModule } from './api/receipt-api/receipt-api.module';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './api/dashboard/dashboard.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logging/logging.interceptor';
import { MemberModule } from './orm/member/member.module';
import { MemberApiModule } from './api/member-api/member-api.module';
import { ExpenseApiModule } from './api/expense-api/expense-api.module';
import { ExpenseModule } from './orm/expense/expense.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60000, limit: 100 }],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: <any>process.env.DB_PORT || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'myaesthetics',
      autoLoadEntities: true,
      synchronize: true, // ⚠️ only for dev
    }),
    /* ORM Modules */
    LoggingModule,

    UserModule,
    ItemModule,
    ReceiptModule,
    MemberModule,
    ExpenseModule,

    /* API Modules */
    AuthModule,
    DashboardModule,
    ItemApiModule,
    ReceiptApiModule,
    MemberApiModule,
    ExpenseApiModule,

    /* Other Modules */
    SharedModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
