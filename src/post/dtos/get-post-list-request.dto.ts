import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class GetPostListWithBoardRequestDto {
  @ApiProperty({
    description:
      '게시판 고유 Id, 1: 취업고민, 2: 취업정보, 3: 한국생활팁, 4: 자유게시판',
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(4)
  boardId: number;

  @ApiProperty({ description: '검색어, 없으면 전체 조회', required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  keyword?: string;
}
