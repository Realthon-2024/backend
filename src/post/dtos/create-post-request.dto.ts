import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreatePostRequestDto {
  @ApiProperty({ description: '게시판 ID' })
  @IsNotEmpty()
  @IsNumber()
  boardId: number;

  @ApiProperty({ description: '게시글 제목' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(250)
  title: string;

  @ApiProperty({ description: '게시글 내용' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(5000)
  content: string;
}
