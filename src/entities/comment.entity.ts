import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from './common.entity';
import { UserEntity } from './user.entity';
import { PostEntity } from './post.entity';

@Entity('comment')
export class CommentEntity extends CommonEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({ type: 'bigint', nullable: true })
  userId: number;

  @Column({ type: 'bigint', nullable: false })
  postId: number;

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => UserEntity, (userEntity) => userEntity.comments, {
    onDelete: 'SET NULL',
  })
  user: UserEntity;

  @JoinColumn({ name: 'postId' })
  @ManyToOne(() => PostEntity, (postEntity) => postEntity.comments, {
    onDelete: 'CASCADE',
  })
  post: PostEntity;
}
