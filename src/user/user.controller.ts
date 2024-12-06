import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserInfo } from 'src/common/interfaces/auth.interface';
import { User } from 'src/common/decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiOkResponse } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';
import { GetProfileDto } from './dtos/get-profile.dto';
import { TranslateResponseDto } from './dtos/translate-response.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: '유저 프로필 조회' })
  @ApiOkResponse({ type: GetProfileDto })
  @Get('profile')
  async getProfile(@User() user: UserInfo) {
    return this.userService.getProfile(user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('accessToken')
  @Get('translate-test')
  async translateTest(@User() user: UserInfo) {
    return this.userService.test(user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: '아무 json이나 유저에 맞는 Language로 번역' })
  @ApiOkResponse({ type: TranslateResponseDto })
  @Post('translate')
  async translate(@Body() body: Record<string, any>, @User() user: UserInfo) {
    return this.userService.translate(body, user.id);
  }
}
