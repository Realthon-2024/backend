import { DeepLLanguage } from 'src/common/enums/language.enum';
import { Injectable } from '@nestjs/common';
import { TranslateService } from 'src/common/translate.service';
import { GetProfileDto } from './dtos/get-profile.dto';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly translateService: TranslateService,
  ) {}

  async getProfile(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    return new GetProfileDto(user);
  }

  async test(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user?.language) {
      throw new Error('사용자 언어 설정이 없습니다.');
    }

    const targetLanguage = DeepLLanguage[user.language];
    console.log(targetLanguage);
    if (!targetLanguage) {
      throw new Error(`지원하지 않는 언어입니다: ${user.language}`);
    }

    return this.translateService.translate('안녕하세요', targetLanguage);
  }
}
