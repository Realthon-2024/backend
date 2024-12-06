// src/chat/dtos/create-chatroom-response.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, } from "class-validator";

export class CreateChatRoomResponseDto {
  @ApiProperty({ description: '채팅 방 id' })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}
