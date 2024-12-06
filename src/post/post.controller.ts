import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostRequestDto } from './dtos/create-post-request.dto';
import { User } from 'src/common/decorators/user.decorator';
import { UserInfo } from 'src/common/interfaces/auth.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetPostListWithBoardRequestDto } from './dtos/get-post-list-request.dto';
import { GetPostListWithBoardResponseDto } from './dtos/get-post-list-response.dto';

@Controller('post')
@ApiTags('Post')
@ApiBearerAuth('accessToken')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getPosts(
    @Query() query: GetPostListWithBoardRequestDto,
  ): Promise<GetPostListWithBoardResponseDto[]> {
    return await this.postService.getPosts(query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getPost(@Param('id') id: number, @User() user: UserInfo) {
    return await this.postService.getPost(id, user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createPost(@Body() body: CreatePostRequestDto, @User() user: UserInfo) {
    return await this.postService.createPost(user.id, body);
  }
}
