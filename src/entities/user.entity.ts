import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from './common.entity';
import { ChatRoomEntity } from './chat-room.entity';
import { PostEntity } from './post.entity';
import { CommentEntity } from './comment.entity';
import { PostReactionEntity } from './post-reaction.entity';

@Entity('user')
export class UserEntity extends CommonEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 10 })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  birthday: string;

  @Column({ type: 'varchar' })
  contact: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ nullable: true, type: 'varchar' })
  langauge: string;

  @Column({ name: 'refresh_token', nullable: true })
  refreshToken: string;

  @OneToMany(() => ChatRoomEntity, (ChatRoomEntity) => ChatRoomEntity.user, {
    cascade: true,
  })
  chatRooms: ChatRoomEntity[];

  @OneToMany(() => PostEntity, (postEntity) => postEntity.user)
  posts: PostEntity[];

  @OneToMany(() => CommentEntity, (commentEntity) => commentEntity.user)
  comments: CommentEntity[];

  @OneToMany(
    () => PostReactionEntity,
    (postReactionEntity) => postReactionEntity.user,
  )
  postReactions: PostReactionEntity[];
}
