export const extractLanguageTagFromLocale = locale =>
  locale.includes('-') ? locale.split('-')[0] : locale;

export const mapLocaleToMomentLocale = locale => {
  if (locale.startsWith('de')) return 'de';
  if (locale.startsWith('es')) return 'es';
  if (locale.startsWith('fr')) return 'fr';
  if (locale === 'zh-CN') return 'zh-cn';
  return 'en-gb';
};

export const mapLocaleToIntlLocale = locale => {
  if (locale.startsWith('de')) return 'de';
  if (locale.startsWith('es')) return 'es';
  if (locale.startsWith('fr')) return 'fr-FR';
  if (locale === 'zh-CN') return 'zh-CN';
  return 'en';
};
