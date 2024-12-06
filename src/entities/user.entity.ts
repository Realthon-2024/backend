import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from './common.entity';
import { Sex } from 'src/common/enums/sex.enum';
import { ChatRoomEntity } from './chat-room.entity';
import { UserLanguageEntity } from './user-language.entity';
import { PostEntity } from './post.entity';
import { CommentEntity } from './comment.entity';
import { PostReactionEntity } from './post-reaction.entity';

@Entity('user')
export class UserEntity extends CommonEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: true, type: 'enum', enum: Sex })
  sex: Sex;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', length: 10 })
  username: string;

  @Column({ nullable: true, type: 'varchar' })
  birthday: string;

  @Column({ name: 'refresh_token', nullable: true })
  refreshToken: string;

  @OneToMany(
    () => UserLanguageEntity,
    (userLanguageEntity) => userLanguageEntity.user,
    { cascade: true },
  )
  userLanguages: UserLanguageEntity[];

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
