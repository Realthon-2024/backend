import { Controller, Get, UseGuards } from '@nestjs/common';
import { getBoardResponseDto } from './dtos/get-board-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { BoardService } from './board.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Board')
@ApiBearerAuth('accessToken')
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  @ApiOperation({
    summary: '게시판 목록 조회',
    description: '게시판 목록을 조회합니다.',
  })
  @ApiResponse({
    type: [getBoardResponseDto],
    description: '게시판 목록',
  })
  @UseGuards(AuthGuard('jwt'))
  async getBoardList(): Promise<getBoardResponseDto[]> {
    return await this.boardService.getBoardList();
  }
}
