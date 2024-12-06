import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatRoomEntity } from 'src/entities/chat-room.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { ChatMessageEntity } from 'src/entities/chat-message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoomEntity, ChatMessageEntity, UserEntity])],
  providers: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
