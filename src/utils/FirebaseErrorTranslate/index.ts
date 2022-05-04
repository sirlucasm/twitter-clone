import translations from './translations';

export const getTranslation = (code: string): string => {
  return translations[code];
}
