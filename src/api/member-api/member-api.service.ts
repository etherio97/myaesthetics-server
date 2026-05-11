import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMemberDto, UpdateMemberDto } from './member-api.dto';
import { Member } from 'src/orm/member/member.entity';

@Injectable()
export class MemberApiService {
  constructor(
    @InjectRepository(Member)
    private memberRepo: Repository<Member>,
  ) {}

  list(memberNo?: number, fullName?: string, phoneNumber?: string) {
    const qb = this.memberRepo.createQueryBuilder('member');

    qb.orderBy('created_at', 'DESC');

    if (memberNo) {
      qb.andWhere('member.memberNo = :memberNo', { memberNo });
    }

    if (fullName) {
      qb.andWhere('member.fullName ILIKE :fullName', {
        fullName: `%${fullName}%`,
      });
    }

    if (phoneNumber) {
      qb.andWhere('member.phoneNumber ILIKE :phoneNumber', {
        phoneNumber: `%${phoneNumber}%`,
      });
    }

    return qb.getMany();
  }

  findOne(id: string) {
    return this.memberRepo.findOneBy({ id });
  }

  async create(dto: CreateMemberDto) {
    const member = this.memberRepo.create(dto);

    await this.memberRepo.save(member);

    return { message: 'Member added successfully' };
  }

  async update(id: string, dto: UpdateMemberDto) {
    await this.memberRepo.update(id, dto);

    return { message: 'Member updated successfully' };
  }

  async delete(id: string) {
    await this.memberRepo.delete(id);

    return { message: 'Member deleted successfully' };
  }
}
