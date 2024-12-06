import type { TargetLanguageCode } from 'deepl-node';

export type DeepLLanguageType = TargetLanguageCode;

export const DeepLLanguage: Record<string, DeepLLanguageType> = {
  BULGARIAN: 'bg',
  CHINESE: 'zh',
  CZECH: 'cs',
  DANISH: 'da',
  DUTCH: 'nl',
  ENGLISH_US: 'en-US',
  ENGLISH_GB: 'en-GB',
  ESTONIAN: 'et',
  FINNISH: 'fi',
  FRENCH: 'fr',
  GERMAN: 'de',
  GREEK: 'el',
  HUNGARIAN: 'hu',
  ITALIAN: 'it',
  JAPANESE: 'ja',
  KOREAN: 'ko',
  LATVIAN: 'lv',
  LITHUANIAN: 'lt',
  POLISH: 'pl',
  PORTUGUESE: 'pt-PT',
  ROMANIAN: 'ro',
  RUSSIAN: 'ru',
  SLOVAK: 'sk',
  SLOVENIAN: 'sl',
  SPANISH: 'es',
  SWEDISH: 'sv',
};

export function isValidTargetLanguage(
  code: string,
): code is TargetLanguageCode {
  return Object.values(DeepLLanguage).includes(code as DeepLLanguageType);
}
