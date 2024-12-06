import { ApiProperty } from '@nestjs/swagger';

export class TranslateResponseDto {
  @ApiProperty({ type: 'object', additionalProperties: { type: 'any' } })
  data: Record<string, any>;
}
