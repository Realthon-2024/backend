import { Injectable } from '@nestjs/common';
import { CreateCommentRequestDto } from './dtos/create-comment-request.dto';
import { CommentEntity } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetCommentResponseDto } from './dtos/get-comment-response.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async createComment(
    userId: number,
    body: CreateCommentRequestDto,
  ): Promise<GetCommentResponseDto> {
    const { postId, content } = body;

    const comment = this.commentRepository.create({
      userId,
      postId,
      content,
    });

    const savedComment = await this.commentRepository.save(comment);

    return new GetCommentResponseDto(savedComment);
  }
}
