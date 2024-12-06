import { UserService } from './../user/user.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/entities/post.entity';
import { Like, Repository } from 'typeorm';
import { CreatePostRequestDto } from './dtos/create-post-request.dto';
import { GetPostListWithBoardRequestDto } from './dtos/get-post-list-request.dto';
import { GetPostListWithBoardResponseDto } from './dtos/get-post-list-response.dto';
import { BoardEntity } from 'src/entities/board.entity';
import { GetPostResponseDto } from './dtos/get-post-response.dto';
import { PostReactionEntity } from 'src/entities/post-reaction.entity';
import { ToggleLikePostResponseDto } from './dtos/toggle-like-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
    @InjectRepository(PostReactionEntity)
    private readonly postReactionRepository: Repository<PostReactionEntity>,
    private readonly userService: UserService,
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

  async getPost(
    id: number,
    userId: number,
    translate: boolean,
  ): Promise<GetPostResponseDto> {
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

    const response = new GetPostResponseDto(post.board, post, userId);

    if (translate) {
      const translatedContent = await this.userService.translate(
        response,
        userId,
      );
      return translatedContent;
    }

    return response;
  }

  async createPost(
    userId: number,
    body: CreatePostRequestDto,
  ): Promise<GetPostResponseDto> {
    const post = this.postRepository.create({
      ...body,
      userId,
    });
    const savedPost = await this.postRepository.save(post);

    return new GetPostResponseDto(savedPost.board, savedPost, userId);
  }

  async toggleLikePost(
    id: number,
    userId: number,
  ): Promise<ToggleLikePostResponseDto> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['postReactions'],
    });

    if (!post) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    if (post.postReactions.find((reaction) => reaction.userId === userId)) {
      await this.postReactionRepository.delete({
        postId: id,
        userId,
      });
      return new ToggleLikePostResponseDto(false);
    } else {
      const postReaction = this.postReactionRepository.create({
        postId: id,
        userId,
      });

      await this.postReactionRepository.save(postReaction);
    }

    return new ToggleLikePostResponseDto(true);
  }
}
