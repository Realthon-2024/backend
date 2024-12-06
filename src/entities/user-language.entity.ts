import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { Language } from 'src/common/enums/language.enum';
import { CommonEntity } from './common.entity';

@Entity('user_language')
export class UserLanguageEntity extends CommonEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ type: 'enum', enum: Language, nullable: false })
  language: Language;

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => UserEntity, (userEntity) => userEntity.userLanguages, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
