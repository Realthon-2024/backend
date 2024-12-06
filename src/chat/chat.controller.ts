import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatRoomRequestDto } from './dtos/create-chatroom-request.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/user.decorator';
import { UserInfo } from 'src/common/interfaces/auth.interface';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatSerivce: ChatService) {}
  
  @UseGuards(AuthGuard('jwt'))
  @Post('new')
  async createChatRoom(
    @User() user: UserInfo,
    @Body() body: CreateChatRoomRequestDto,
  ) {
    return await this.chatSerivce.createChatRoom(user.id, body);
  }

  @Post()
  async sendMessage() {};

}
