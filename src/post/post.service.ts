import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/entities/post.entity';
import { Like, Repository } from 'typeorm';
import { CreatePostRequestDto } from './dtos/create-post-request.dto';
import { GetPostListWithBoardRequestDto } from './dtos/get-post-list-request.dto';
import { GetPostListWithBoardResponseDto } from './dtos/get-post-list-response.dto';
import { BoardEntity } from 'src/entities/board.entity';
import { GetPostResponseDto } from './dtos/get-post-response.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
  ) {}

  async getPosts(
    query: GetPostListWithBoardRequestDto,
  ): Promise<GetPostListWithBoardResponseDto[]> {
    const { boardId, keyword } = query;
    const board = await this.boardRepository.findOne({
      where: {
        id: boardId,
      },
    });

    if (!board) {
      throw new NotFoundException('게시판을 찾을 수 없습니다.');
    }

    const posts = await this.postRepository.find({
      where: {
        boardId: boardId,
        ...(keyword && { title: Like(`%${keyword}%`) }),
      },
      relations: ['user', 'comments', 'postReactions'],
    });

    return posts.map((post) => {
      return new GetPostListWithBoardResponseDto(board, post);
    });
  }

  async getPost(id: number, userId: number) {
    await this.postRepository.update(id, {
      views: () => 'views + 1',
    });

    const post = await this.postRepository.findOne({
      where: { id },
      relations: [
        'board',
        'user',
        'comments',
        'comments.user',
        'postReactions',
      ],
    });

    if (!post) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    return new GetPostResponseDto(post.board, post, userId);
  }

  async createPost(userId: number, body: CreatePostRequestDto) {
    const post = this.postRepository.create({
      ...body,
      userId,
    });
    return await this.postRepository.save(post);
  }
}
