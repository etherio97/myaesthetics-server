export class CreateMemberDto {
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  memberType: string;
}

export class UpdateMemberDto {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  memberType?: string;
}
