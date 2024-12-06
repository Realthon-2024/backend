import { BoardEntity } from 'src/entities/board.entity';
import { PostEntity } from 'src/entities/post.entity';

export class GetPostListWithBoardResponseDto {
  boardName: string;

  title: string;

  content: string;

  viewCount: number;

  likeCount: number;

  commentCount: number;

  createdAt: Date;

  authorName: string;

  constructor(board: BoardEntity, post: PostEntity) {
    this.boardName = board.name;
    this.title = post.title;
    this.content = post.content;
    this.viewCount = post.views;
    this.likeCount = post.postReactions?.length ?? 0;
    this.commentCount = post.comments?.length ?? 0;
    this.createdAt = post.createdAt;
    this.authorName = post.user.username;
  }
}
