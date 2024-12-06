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

  async test() {
    return this.translateService.translateToEng('안녕하세요');
  }
}
