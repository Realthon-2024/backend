import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatRoomEntity } from 'src/entities/chat-room.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoomEntity])],
  providers: [ChatService],
  controllers: [ChatController]
})
export class ChatModule {}
