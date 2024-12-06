// src/chat/dtos/create-chatroom-request.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsString, } from "class-validator";

export class CreateChatRoomRequestDto {
  @ApiProperty({ description: '채팅 방 제목' })
  @IsString()
  title: string;
}
