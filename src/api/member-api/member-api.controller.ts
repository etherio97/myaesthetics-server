import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MemberApiService } from './member-api.service';
import { CreateMemberDto, UpdateMemberDto } from './member-api.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('member')
export class MemberApiController {
  constructor(private memberService: MemberApiService) {}

  @UseGuards(AuthGuard)
  @Get('list')
  list(
    @Query('memberNo') memberNo: number,
    @Query('fullName') fullName: string,
    @Query('phoneNumber') phoneNumber: string,
  ) {
    return this.memberService
      .list(memberNo, fullName, phoneNumber)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard)
  @Get('list/:id')
  findOne(@Param('id') id: string) {
    return this.memberService
      .findOne(id)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard)
  @Post('create')
  create(@Body() dto: CreateMemberDto) {
    return this.memberService
      .create(dto)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard)
  @Post('update/:id')
  update(@Param('id') id: string, @Body() dto: UpdateMemberDto) {
    return this.memberService
      .update(id, dto)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @Post('delete/:id')
  delete(@Param('id') id: string) {
    return this.memberService
      .delete(id)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }
}
