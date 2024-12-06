import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCommentRequestDto } from './dtos/create-comment-request.dto';
import { UserInfo } from 'src/common/interfaces/auth.interface';
import { User } from 'src/common/decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('comment')
@ApiTags('Comment')
@ApiBearerAuth('accessToken')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: '댓글 생성' })
  async createComment(
    @User() user: UserInfo,
    @Body() body: CreateCommentRequestDto,
  ) {
    return await this.commentService.createComment(user.id, body);
  }
}
