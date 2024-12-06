import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { BoardEntity } from 'src/entities/board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [BoardService],
  controllers: [BoardController],
  imports: [TypeOrmModule.forFeature([BoardEntity])],
})
export class BoardModule {}
