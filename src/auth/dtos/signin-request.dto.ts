import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInRequestDto {
  @ApiProperty({ description: '사용자 ID' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: '사용자 비밀번호' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
