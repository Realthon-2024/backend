import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostRequestDto } from './dtos/create-post-request.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async createPost(userId: number, body: CreatePostRequestDto) {
    const post = this.postRepository.create({
      ...body,
      userId,
    });
    return await this.postRepository.save(post);
  }
}
