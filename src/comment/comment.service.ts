import { Injectable } from '@nestjs/common';
import { CreateCommentRequestDto } from './dtos/create-comment-request.dto';
import { CommentEntity } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async createComment(userId: number, body: CreateCommentRequestDto) {
    const { postId, content } = body;

    const comment = this.commentRepository.create({
      userId,
      postId,
      content,
    });

    return await this.commentRepository.save(comment);
  }
}
