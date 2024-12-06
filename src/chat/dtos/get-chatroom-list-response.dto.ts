// src/chat/dtos/create-chatroom-response.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { ChatRoomEntity } from "src/entities/chat-room.entity";

export class GetChatRoomListResponseDto {
  @ApiProperty({ description: '채팅 방 id' })
  id: number;

  @ApiProperty({ description: '채팅 방 제목' })
  title: string;

  @ApiProperty({ description: '채팅 방을 소유한 사용자 id' })
  userId: number;

  @ApiProperty({ description: '채팅 방 생성 일시' })
  createdAt: Date;
  
  @ApiProperty({ description: '채팅 방 최종 수정 일시' })
  updatedAt: Date;

  constructor(room: ChatRoomEntity) {
    this.id = room.id;
    this.title = room.title;
    this.userId = room.userId;
    this.createdAt = room.createdAt;
    this.updatedAt = room.updatedAt;
  }
}
