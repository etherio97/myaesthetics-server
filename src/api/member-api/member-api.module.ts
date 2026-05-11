import { Module } from '@nestjs/common';
import { MemberApiController } from './member-api.controller';
import { MemberApiService } from './member-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { Member } from 'src/orm/member/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member]), SharedModule],
  controllers: [MemberApiController],
  providers: [MemberApiService],
})
export class MemberApiModule {}
