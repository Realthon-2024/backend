import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from './common.entity';
import { Sex } from 'src/common/enums/sex.enum';
import { UserLanguageEntity } from './user-language';
import { ChatRoomEntity } from './chat-room';

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

  @OneToMany(
    () => UserLanguageEntity,
    (userLanguageEntity) => userLanguageEntity.user,
    { cascade: true },
  )
  userLanguages: UserLanguageEntity[];

  @OneToMany(
    () => ChatRoomEntity,
    (ChatRoomEntity) => ChatRoomEntity.id,
    { cascade: true },
  )
  chatRooms: ChatRoomEntity[];
  
}
