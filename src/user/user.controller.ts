import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserInfo } from 'src/common/interfaces/auth.interface';
import { User } from 'src/common/decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiOkResponse } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';
import { GetProfileDto } from './dtos/get-profile.dto';

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

  @Get('translate-test')
  async translateTest() {
    return this.userService.test();
  }
}
