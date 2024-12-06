import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SignUpRequestDto } from './dtos/signup-request.dto';
import { AuthService } from './auth.service';
import { SignInRequestDto } from './dtos/signin-request.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/user.decorator';
import { UserInfo } from 'src/common/interfaces/auth.interface';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: SignUpRequestDto) {
    return this.authService.signUp(body);
  }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async signIn(@User() user: UserInfo, @Body() body: SignInRequestDto) {
    console.log(body.username);
    return this.authService.signIn(user.id);
  }

  @ApiBearerAuth('refreshToken')
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  async refreshToken(@User() user: UserInfo) {
    return this.authService.refreshToken(user.id);
  }
}
