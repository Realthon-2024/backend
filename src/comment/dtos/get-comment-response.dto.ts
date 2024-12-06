import { CommentEntity } from 'src/entities/comment.entity';

export class GetCommentResponseDto {
  id: number;
  writer: string;
  content: string;
  createdAt: Date;

  constructor(comment: CommentEntity) {
    this.id = comment.id;
    this.writer = comment.user.username;
    this.content = comment.content;
    this.createdAt = comment.createdAt;
  }
}
