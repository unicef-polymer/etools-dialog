import translations from '../assets/translations';

export function getTranslation(lang: string, key: string) {
  try {
    return translations[lang][key];
  } catch (error) {
    return translations.en[key];
  }
}
