import { UserInfo } from './../common/interfaces/auth.interface';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpRequestDto } from './dtos/signup-request.dto';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { TokenResponseDto } from './dtos/token-response.dto';
import { JwtPayload } from 'src/common/interfaces/auth.interface';
import { hash, compare } from 'bcrypt';
import { SignUpResponseDto } from './dtos/sign-up-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(body: SignUpRequestDto) {
    body.password = await hash(body.password, 10);
    const user = this.userRepository.create({
      ...body,
    });
    await this.userRepository.save(user);

    return new SignUpResponseDto(true);
  }

  async signIn(userId: number) {
    const token = await this.getToken({
      id: userId,
      signedAt: new Date().toISOString(),
    });

    await this.saveRefreshToken(userId, token.refreshToken);

    return new TokenResponseDto(token.accessToken, token.refreshToken);
  }

  async validateUser(username: string, password: string): Promise<UserInfo> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('INVALID_PASSWORD');
    }

    return user;
  }

  async getToken(payload: JwtPayload): Promise<TokenResponseDto> {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
      secret: process.env.JWT_SECRET_KEY,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '30d',
      secret: process.env.JWT_REFRESH_SECRET_KEY,
    });

    return new TokenResponseDto(accessToken, refreshToken);
  }

  async saveRefreshToken(userId: number, refreshToken: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }
    await this.userRepository.update(userId, { refreshToken });
  }

  async refreshToken(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    const token = await this.getToken({
      id: userId,
      signedAt: new Date().toISOString(),
    });

    await this.saveRefreshToken(userId, token.refreshToken);

    return new TokenResponseDto(token.accessToken, token.refreshToken);
  }
}
