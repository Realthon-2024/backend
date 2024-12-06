import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Sex } from 'src/common/enums/sex.enum';

export class SignUpRequestDto {
  @ApiProperty({ description: '사용자 ID' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: '사용자 비밀번호' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ description: '성별', enum: Sex })
  @IsEnum(Sex)
  @IsNotEmpty()
  sex: Sex;

  @ApiProperty({ description: '생년월일, yyyy-mm-dd 형식' })
  @IsString()
  @IsNotEmpty()
  birthday: string;

  @ApiProperty({ description: '언어' })
  @IsString()
  @IsNotEmpty()
  language: string;
}
