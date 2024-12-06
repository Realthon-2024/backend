// src/chat/dtos/bot-message.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { ChatMessageEntity } from "src/entities/chat-message.entity";

export class BotMessageDto {
  @ApiProperty({ description: '챗봇이 보낸 채팅 메시지 내용' })
  content: string;

  @ApiProperty({ description: '챗봇이 채팅 메시지를 보낸 일시'})
  createdAt: Date;

  constructor(botmsg: ChatMessageEntity) {
    this.content = botmsg.content;
    this.createdAt = botmsg.createdAt;
  }
}
