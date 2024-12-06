import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserInfo } from 'src/common/interfaces/auth.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string): Promise<UserInfo> {
    const user: UserInfo = await this.authService.validateUser(
      username,
      password,
    );

    if (!user) {
      throw new UnauthorizedException('INVALID_USERNAME_OR_PASSWORD');
    }

    return user;
  }
}
