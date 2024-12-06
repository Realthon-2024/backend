import { ApiProperty } from '@nestjs/swagger';
import { BoardEntity } from 'src/entities/board.entity';
import { PostEntity } from 'src/entities/post.entity';
import { CommunityUserDto } from './community-user.dto';

export class GetPostListWithBoardResponseDto {
  @ApiProperty({
    description: '게시판 이름',
    example: '취업고민',
  })
  boardName: string;

  @ApiProperty({
    description: '게시글 고유 Id',
  })
  id: number;

  @ApiProperty({
    description: '게시글 제목',
    example: '게시글 제목',
  })
  title: string;

  @ApiProperty({
    description: '게시글 내용',
    example: '게시글 내용',
  })
  content: string;

  @ApiProperty({
    description: '게시글 조회수',
    example: 10,
  })
  viewCount: number;

  @ApiProperty({
    description: '게시글 좋아요 수',
    example: 10,
  })
  likeCount: number;

  @ApiProperty({
    description: '게시글 댓글 수',
    example: 10,
  })
  commentCount: number;

  @ApiProperty({
    description: '게시글 작성일',
    example: '2024-01-01',
  })
  createdAt: Date;

  @ApiProperty({
    description: '게시글 작성자 이름',
    example: '작성자 이름',
  })
  author: CommunityUserDto;

  constructor(board: BoardEntity, post: PostEntity) {
    this.id = post.id;
    this.boardName = board.name;
    this.title = post.title;
    this.content = post.content;
    this.viewCount = post.views;
    this.likeCount = post.postReactions?.length ?? 0;
    this.commentCount = post.comments?.length ?? 0;
    this.createdAt = post.createdAt;
    this.author = new CommunityUserDto(post.user);
  }
}
