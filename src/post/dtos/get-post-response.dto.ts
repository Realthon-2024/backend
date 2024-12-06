import { PostEntity } from 'src/entities/post.entity';
import { GetPostListWithBoardResponseDto } from './get-post-list-response.dto';
import { BoardEntity } from 'src/entities/board.entity';
import { GetCommentResponseDto } from 'src/comment/dtos/get-comment-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetPostResponseDto extends GetPostListWithBoardResponseDto {
  @ApiProperty({
    description: '게시글 좋아요 여부',
    example: true,
  })
  isLiked: boolean;

  @ApiProperty({
    description: '게시글 댓글 목록',
    type: [GetCommentResponseDto],
  })
  comments: GetCommentResponseDto[];

  constructor(board: BoardEntity, post: PostEntity, userId: number) {
    super(board, post);
    this.isLiked = post.postReactions?.some(
      (reaction) => reaction.userId === userId,
    );
    this.comments = post.comments.map(
      (comment) => new GetCommentResponseDto(comment),
    );
  }
}
