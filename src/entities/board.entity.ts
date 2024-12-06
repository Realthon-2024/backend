import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from './common.entity';
import { PostEntity } from './post.entity';

@Entity('board')
export class BoardEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @OneToMany(() => PostEntity, (postEntity) => postEntity.board)
  posts: PostEntity[];
}
