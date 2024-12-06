import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentRequestDto {
  @ApiProperty({
    description: '게시글 ID',
  })
  @IsNotEmpty()
  @IsNumber()
  postId: number;

  @ApiProperty({
    description: '댓글 내용',
  })
  @IsNotEmpty()
  @IsString()
  content: string;
}
