import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as deepl from 'deepl-node';

@Injectable()
export class TranslateService {
  private translator: deepl.Translator;

  constructor(private readonly configService: ConfigService) {
    this.translator = new deepl.Translator(
      this.configService.get('DEEPL_API_KEY'),
    );
  }

  async translate(
    text: string,
    target: deepl.TargetLanguageCode,
  ): Promise<string> {
    const result = await this.translator.translateText(text, null, target);
    return result.text;
  }

  async translateTo(
    text: string,
    target: deepl.TargetLanguageCode,
  ): Promise<string> {
    const result = await this.translator.translateText(text, null, target);
    return result.text;
  }

  async translateToEng(text: string): Promise<string> {
    const result = await this.translator.translateText(text, null, 'en-US');
    return result.text;
  }

  async translateToKor(text: string): Promise<string> {
    const result = await this.translator.translateText(text, null, 'ko');
    return result.text;
  }
}
