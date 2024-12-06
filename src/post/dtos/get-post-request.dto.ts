import { IsOptional, IsBoolean } from 'class-validator';
import { ToBoolean } from '../../common/decorators/to-boolean';
import { ApiProperty } from '@nestjs/swagger';

export class GetPostRequestDto {
  @ApiProperty({
    description: '번역 여부',
    example: true,
  })
  @ToBoolean()
  @IsOptional()
  @IsBoolean()
  translate: boolean;
}
