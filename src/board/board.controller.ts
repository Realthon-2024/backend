import { Controller, Get, UseGuards } from '@nestjs/common';
import { getBoardResponseDto } from './dtos/get-board-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getBoardList(): Promise<getBoardResponseDto[]> {
    return this.boardService.getBoardList();
  }
}
