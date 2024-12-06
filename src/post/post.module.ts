import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'src/entities/post.entity';
import { BoardEntity } from 'src/entities/board.entity';
import { PostReactionEntity } from 'src/entities/post-reaction.entity';

@Module({
  providers: [PostService],
  controllers: [PostController],
  imports: [
    TypeOrmModule.forFeature([PostEntity, BoardEntity, PostReactionEntity]),
  ],
})
export class PostModule {}
