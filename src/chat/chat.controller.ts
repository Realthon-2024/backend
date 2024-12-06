import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatRoomRequestDto } from './dtos/create-chatroom-request.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/user.decorator';
import { UserInfo } from 'src/common/interfaces/auth.interface';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserMessageDto } from './dtos/user-message.dto';
import { BotMessageDto } from './dtos/bot-message.dto';
import { GetChatRoomResponseDto } from './dtos/get-chatroom-response.dto';

@Controller('chat')
@ApiBearerAuth('accessToken')
export class ChatController {
  constructor(private readonly chatSerivce: ChatService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: '채팅 방 생성' })
  @ApiResponse({
    type: BotMessageDto,
    description: '채팅 방 생성',
  })
  async createChatRoom(
    @User() user: UserInfo,
    @Body() body: CreateChatRoomRequestDto,
  ): Promise<GetChatRoomResponseDto> {
    return await this.chatSerivce.createChatRoom(user.id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('message')
  @ApiOperation({ summary: '채팅 메시지 전송 및 수신' })
  @ApiResponse({
    type: BotMessageDto,
    description: '채팅 메시지 전송 및 수신',
  })
  async handleMessage(
    @Body() usermsg: UserMessageDto,
  ): Promise<BotMessageDto> {
    await this.chatSerivce.saveUserMessage(usermsg);
    const response = await this.chatSerivce.getBotResponse(usermsg);
    return await this.chatSerivce.saveBotMessage(usermsg.chatRoomId, response);
  };

}
