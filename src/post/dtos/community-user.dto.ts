import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/user.entity';

export class CommunityUserDto {
  @ApiProperty({
    description: 'DB상의 유저 고유 Id',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '유저 ID',
    example: '유저 ID',
  })
  username: string;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.username = user.username;
  }
}
