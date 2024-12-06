import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatRoomEntity } from './chat-room';

@Entity('chat_message')
export class ChatMessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @Column()
  isUserMessage: boolean;

  @ManyToOne(() => ChatRoomEntity, (chatRoom) => chatRoom.messages)
  @JoinColumn({ name: 'chatRoomId' })
  chatRoom: ChatRoomEntity;

  @Column()
  chatRoomId: number;

  @CreateDateColumn()
  createdAt: Date;
}
