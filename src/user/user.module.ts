import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TranslateService } from 'src/common/translate.service';
import { UserEntity } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [UserService, TranslateService],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UserModule {}
