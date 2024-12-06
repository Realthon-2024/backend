import { Injectable, NotFoundException } from '@nestjs/common';
import { ChatRoomEntity } from 'src/entities/chat-room.entity';
import { CreateChatRoomRequestDto } from './dtos/create-chatroom-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { ChatMessageEntity } from 'src/entities/chat-message.entity';
import { UserMessageDto } from './dtos/user-message.dto';
import { BotMessageDto } from './dtos/bot-message.dto';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GetChatRoomResponseDto } from './dtos/get-chatroom-response.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ChatRoomEntity)
    private readonly chatRoomRepository: Repository<ChatRoomEntity>,
    @InjectRepository(ChatMessageEntity)
    private readonly chatMessageRepository: Repository<ChatMessageEntity>,
  ) {}

  async createChatRoom(userId: number, body: CreateChatRoomRequestDto) {
    const foundUser = this.userRepository.findOne({ where: { id: userId } });
    if (!foundUser) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    const room = this.chatRoomRepository.create({
      ...body,
      userId: userId,
    });
    const savedRoom = await this.chatRoomRepository.save(room);

    return new GetChatRoomResponseDto(savedRoom);
  }

  async saveUserMessage(usermsg: UserMessageDto) {
    const foundChatRoom = this.chatRoomRepository.findOne({ 
      where: { id: usermsg.chatRoomId } });
    if (!foundChatRoom) {
      throw new NotFoundException('CHATROOM_NOT_FOUND');
    }

    const message = this.chatMessageRepository.create({
      ...usermsg,
      isUserMessage: true,
    })

    await this.chatMessageRepository.save(message);
  }

  async getBotResponse(usermsg: UserMessageDto): Promise<string> {
    try {

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = usermsg.content;
      
      const result = await model.generateContent(prompt);

      console.log(result);
      return result.response.text();

    } catch (error) {
      console.error('Error communicating with Gemini API:', error);
      throw new Error('Failed to communicate with Gemini API');
    }    
  }

  async saveBotMessage(
    chatRoomId: number, 
    response: string,
  ): Promise<BotMessageDto> {
    const foundChatRoom = this.chatRoomRepository.findOne({ where: { id: chatRoomId } });
    if (!foundChatRoom) {
      throw new NotFoundException('CHATROOM_NOT_FOUND');
    }

    const message = this.chatMessageRepository.create({
      content: response,
      isUserMessage: false,
      chatRoomId: chatRoomId,
    })
    const savedBotMsg = await this.chatMessageRepository.save(message);

    return new BotMessageDto(savedBotMsg);
  }
}
