import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SignUpRequestDto } from './dtos/signup-request.dto';
import { AuthService } from './auth.service';
import { SignInRequestDto } from './dtos/signin-request.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/user.decorator';
import { UserInfo } from 'src/common/interfaces/auth.interface';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignUpResponseDto } from './dtos/sign-up-response.dto';
import { TokenResponseDto } from './dtos/token-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    type: SignUpResponseDto,
    description: '회원가입',
  })
  async signUp(@Body() body: SignUpRequestDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(body);
  }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({
    type: TokenResponseDto,
    description: '로그인',
  })
  async signIn(
    @User() user: UserInfo,
    @Body() body: SignInRequestDto,
  ): Promise<TokenResponseDto> {
    console.log(body.username);
    return this.authService.signIn(user.id);
  }

  @ApiBearerAuth('refreshToken')
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  @ApiOperation({ summary: '토큰 재발급' })
  @ApiResponse({
    type: TokenResponseDto,
    description: '토큰 재발급',
  })
  async refreshToken(@User() user: UserInfo): Promise<TokenResponseDto> {
    return this.authService.refreshToken(user.id);
  }
}
