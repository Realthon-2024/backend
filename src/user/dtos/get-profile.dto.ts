import { UserEntity } from 'src/entities/user.entity';

import { ApiProperty } from '@nestjs/swagger';

export class GetProfileDto {
  @ApiProperty({ description: 'DB 상의 유저 고유 ID' })
  id: number;

  @ApiProperty({ description: '유저 아이디' })
  username: string;

  @ApiProperty({ description: '생년월일' })
  birth: string;

  @ApiProperty({ description: '언어' })
  contact: string;

  @ApiProperty({ description: '이메일' })
  email: string;

  @ApiProperty({ description: '주소' })
  address: string;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.username = user.username;
    this.birth = user.birthday;
    this.contact = user.contact;
    this.email = user.email;
    this.address = user.address;
  }
}
