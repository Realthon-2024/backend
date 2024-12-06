import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentEntity } from 'src/entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [CommentService],
  controllers: [CommentController],
  imports: [TypeOrmModule.forFeature([CommentEntity])],
})
export class CommentModule {}
