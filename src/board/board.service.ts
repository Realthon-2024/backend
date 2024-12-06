import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from 'src/entities/board.entity';
import { Repository } from 'typeorm';
import { getBoardResponseDto } from './dtos/get-board-response.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
  ) {}

  async getBoardList(): Promise<getBoardResponseDto[]> {
    const boards = await this.boardRepository.find();
    return boards.map((board) => new getBoardResponseDto(board));
  }

  async getBoardById(boardId: number): Promise<BoardEntity> {
    return await this.boardRepository.findOne({ where: { id: boardId } });
  }
}
