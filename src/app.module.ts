import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { PostModule } from './post/post.module';
import { ChatModule } from './chat/chat.module';
import { CommentModule } from './comment/comment.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [path.join(__dirname, '/entities/**/*.entity.{js, ts}')],
      synchronize: false,
      logging: true,
    }),
    AuthModule,
    BoardModule,
    PostModule,
    ChatModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
