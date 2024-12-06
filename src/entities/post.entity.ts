import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from './common.entity';
import { UserEntity } from './user.entity';
import { BoardEntity } from './board.entity';
import { CommentEntity } from './comment.entity';
import { PostReactionEntity } from './post-reaction.entity';

@Entity('post')
export class PostEntity extends CommonEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: true })
  userId: number;

  @Column({ nullable: false })
  boardId: number;

  @Column('varchar', { nullable: false })
  title: string;

  @Column('text', { nullable: false })
  content: string;

  @Column('int', { nullable: false, default: 0 })
  views: number;

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => UserEntity, (userEntity) => userEntity.posts, {
    onDelete: 'SET NULL',
  })
  user: UserEntity;

  @JoinColumn({ name: 'boardId' })
  @ManyToOne(() => BoardEntity, (boardEntity) => boardEntity.posts)
  board: BoardEntity;

  @OneToMany(() => CommentEntity, (commentEntity) => commentEntity.post, {
    cascade: true,
  })
  comments: CommentEntity[];

  @OneToMany(
    () => PostReactionEntity,
    (postReactionEntity) => postReactionEntity.post,
    {
      cascade: true,
    },
  )
  postReactions: PostReactionEntity[];
}
