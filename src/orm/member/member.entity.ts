import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'member_no',
    type: 'int',
    default: () => "nextval('member_no_seq')",
  })
  memberNo: number;

  @Column({
    name: 'full_name',
    type: 'varchar',
    length: 255,
  })
  fullName: string;

  @Column({
    name: 'phone_number',
    type: 'varchar',
    length: 255,
  })
  phoneNumber: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  email: string;

  @Column({
    name: 'address',
    type: 'text',
    nullable: true,
  })
  address: string;

  @Column({
    name: 'member_type',
    type: 'varchar',
    length: 64,
  })
  memberType: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  updatedAt: Date;
}
