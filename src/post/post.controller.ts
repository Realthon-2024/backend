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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetPostListWithBoardRequestDto } from './dtos/get-post-list-request.dto';
import { GetPostListWithBoardResponseDto } from './dtos/get-post-list-response.dto';
import { GetPostResponseDto } from './dtos/get-post-response.dto';
import { ToggleLikePostResponseDto } from './dtos/toggle-like-post.dto';
import { GetPostRequestDto } from './dtos/get-post-request.dto';

@Controller('post')
@ApiTags('Post')
@ApiBearerAuth('accessToken')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: '게시글 목록 조회' })
  @ApiResponse({
    type: [GetPostListWithBoardResponseDto],
    description: '게시글 목록',
  })
  async getPosts(
    @Query() query: GetPostListWithBoardRequestDto,
  ): Promise<GetPostListWithBoardResponseDto[]> {
    return await this.postService.getPosts(query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOperation({ summary: '게시글 상세 조회' })
  @ApiResponse({
    type: GetPostResponseDto,
    description: '게시글 상세',
  })
  async getPost(
    @Param('id') id: number,
    @Query() query: GetPostRequestDto,
    @User() user: UserInfo,
  ): Promise<GetPostResponseDto> {
    return await this.postService.getPost(id, user.id, query.translate);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: '게시글 생성' })
  @ApiResponse({
    type: GetPostResponseDto,
    description: '게시글 생성',
  })
  async createPost(
    @Body() body: CreatePostRequestDto,
    @User() user: UserInfo,
  ): Promise<GetPostResponseDto> {
    return await this.postService.createPost(user.id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/like')
  @ApiOperation({ summary: '게시글 좋아요 토글' })
  @ApiResponse({
    type: ToggleLikePostResponseDto,
    description: '게시글 좋아요 토글',
  })
  async toggleLikePost(
    @Param('id') id: number,
    @User() user: UserInfo,
  ): Promise<ToggleLikePostResponseDto> {
    return await this.postService.toggleLikePost(id, user.id);
  }
}
