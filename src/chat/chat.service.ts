import { Injectable, NotFoundException } from '@nestjs/common';
import { ChatRoomEntity } from 'src/entities/chat-room.entity';
import { CreateChatRoomRequestDto } from './dtos/create-chatroom-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatRoomResponseDto } from './dtos/create-chatroom-response.dto';
import { UserInfo } from 'src/common/interfaces/auth.interface';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatRoomEntity)
    private readonly chatRoomRepository: Repository<ChatRoomEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  
  async createChatRoom (
    user: UserInfo,
    body: CreateChatRoomRequestDto,
  ) {
    const foundUser = this.userRepository.findOne({ where: {id: user.id}});
    if (!foundUser) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    const room = this.chatRoomRepository.create({
      title: body.title,
      userId: user.id,
    });

    const newRoom = await this.chatRoomRepository.save(room);
    return new CreateChatRoomResponseDto(newRoom.id);
  }

}
