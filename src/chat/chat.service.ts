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
import { GetChatRoomListResponseDto } from './dtos/get-chatroom-list-response.dto';

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

  async getChatRoomList(
    userId: number
  ): Promise<GetChatRoomListResponseDto[]> {
    const foundUser = this.userRepository.findOne({ where: { id: userId } });
    if (!foundUser) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    const rooms = await this.chatRoomRepository.find({
      where: {
        userId: userId,
      },
    });

    return rooms.map((room) => {
      return new GetChatRoomListResponseDto(room);
    })
  }

  async createChatRoom(
    userId: number, 
    body: CreateChatRoomRequestDto,
  ): Promise<GetChatRoomResponseDto> {
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

  async getBotResponse(
    userId: number,
    usermsg: UserMessageDto,
  ): Promise<string> {
    try {
      const foundUser = this.userRepository.findOne({ where: { id: userId } });
      if (!foundUser) {
        throw new NotFoundException('USER_NOT_FOUND');
      }

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `You are an expert providing accurate legal information for foreign workers residing in Korea. You should deliver the legal information in a way that is easy to understand from the perspective of the person asking the question, offering concise and accurate answers. Your response should be written in ${(await foundUser).language} and markdown format:\n\n` + usermsg.content;
      
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

  async getChatRoom(
    userId: number,
    roomId: number,
  ): Promise<GetChatRoomResponseDto> {

    const room = await this.chatRoomRepository.findOne({
      where: { id: roomId, userId: userId },
      relations: [ 'messages', ],
    });

    if (!room) {
      throw new NotFoundException('CHATROOM_NOT_FOUND');
    }

    return new GetChatRoomResponseDto(room);
  }
}
