import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostRequestDto } from './dtos/create-post-request.dto';
import { User } from 'src/common/decorators/user.decorator';
import { UserInfo } from 'src/common/interfaces/auth.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('post')
@ApiTags('Post')
@ApiBearerAuth('accessToken')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createPost(@Body() body: CreatePostRequestDto, @User() user: UserInfo) {
    return await this.postService.createPost(user.id, body);
  }
}
