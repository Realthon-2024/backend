import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from './common.entity';
import { Sex } from 'src/common/enums/sex.enum';
import { ChatRoomEntity } from './chat-room.entity';
import { UserLanguageEntity } from './user-language.entity';

@Entity('user')
export class UserEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: string;

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
}
