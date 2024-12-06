// src/chat/dtos/user-message.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, } from "class-validator";

export class UserMessageDto {
  @ApiProperty({ description: '사용자가 보낸 채팅 메시지 내용' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: '메시지가 속한 채팅방의 id' })
  @IsNumber()
  @IsNotEmpty()
  chatRoomId: number;
}
