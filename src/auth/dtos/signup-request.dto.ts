import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpRequestDto {
  @ApiProperty({ description: '사용자 ID' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: '사용자 비밀번호' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: '생년월일, yyyy-mm-dd 형식' })
  @IsString()
  @IsNotEmpty()
  birthday: string;

  @ApiProperty({ description: '사용자 연락처' })
  @IsString()
  @IsNotEmpty()
  contact: string;

  @ApiProperty({ description: '사용자 이메일 주소' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: '사용자 거주지 주소' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: '언어' })
  @IsNotEmpty()
  @IsString()
  language: string;
}
