
// @ts-nocheck
/* THIS IS A GENERATED FILE */

import moment from 'moment';

/**
 * Registers a locale as a child of a parent locale if not already registered.
 * This is needed for regional locales (e.g., 'en-be') that don't have their own
 * moment locale file but should inherit formatting from a parent (e.g., 'en-gb').
 */
function defineLocaleIfNeeded(locale: string, parentLocale: string): void {
  if (!moment.locales().includes(locale)) {
    moment.defineLocale(locale, { parentLocale });
  }
  moment.locale(locale);
}

async function loadMomentLocales(locale: string): Promise<void> {
  const lowercaseLocale = locale.toLowerCase();

  switch (lowercaseLocale) {
  
    case 'de':
      await import('moment/dist/locale/de');
      break;

    case 'de-at':
      await import('moment/dist/locale/de-at');
      break;

    case 'de-be':
      await import('moment/dist/locale/de');
      await defineLocaleIfNeeded('de-be', 'de');
      break;

    case 'de-ch':
      await import('moment/dist/locale/de-ch');
      break;

    case 'de-de':
      await import('moment/dist/locale/de');
      await defineLocaleIfNeeded('de-de', 'de');
      break;

    case 'de-li':
      await import('moment/dist/locale/de');
      await defineLocaleIfNeeded('de-li', 'de');
      break;

    case 'de-lu':
      await import('moment/dist/locale/de');
      await defineLocaleIfNeeded('de-lu', 'de');
      break;

    case 'en-ag':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-ag', 'en-gb');
      break;

    case 'en-ai':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-ai', 'en-gb');
      break;

    case 'en-au':
      await import('moment/dist/locale/en-au');
      break;

    case 'en-bb':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-bb', 'en-gb');
      break;

    case 'en-be':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-be', 'en-gb');
      break;

    case 'en-bi':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-bi', 'en-gb');
      break;

    case 'en-bm':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-bm', 'en-gb');
      break;

    case 'en-bs':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-bs', 'en-gb');
      break;

    case 'en-bw':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-bw', 'en-gb');
      break;

    case 'en-bz':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-bz', 'en-gb');
      break;

    case 'en-ca':
      await import('moment/dist/locale/en-ca');
      break;

    case 'en-cc':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-cc', 'en-gb');
      break;

    case 'en-ck':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-ck', 'en-gb');
      break;

    case 'en-cm':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-cm', 'en-gb');
      break;

    case 'en-cq':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-cq', 'en-gb');
      break;

    case 'en-cx':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-cx', 'en-gb');
      break;

    case 'en-dg':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-dg', 'en-gb');
      break;

    case 'en-dm':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-dm', 'en-gb');
      break;

    case 'en-er':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-er', 'en-gb');
      break;

    case 'en-fj':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-fj', 'en-gb');
      break;

    case 'en-fk':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-fk', 'en-gb');
      break;

    case 'en-gb':
      await import('moment/dist/locale/en-gb');
      break;

    case 'en-gd':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-gd', 'en-gb');
      break;

    case 'en-gg':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-gg', 'en-gb');
      break;

    case 'en-gh':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-gh', 'en-gb');
      break;

    case 'en-gi':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-gi', 'en-gb');
      break;

    case 'en-gm':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-gm', 'en-gb');
      break;

    case 'en-gy':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-gy', 'en-gb');
      break;

    case 'en-hk':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-hk', 'en-gb');
      break;

    case 'en-ie':
      await import('moment/dist/locale/en-ie');
      break;

    case 'en-im':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-im', 'en-gb');
      break;

    case 'en-in':
      await import('moment/dist/locale/en-in');
      break;

    case 'en-io':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-io', 'en-gb');
      break;

    case 'en-je':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-je', 'en-gb');
      break;

    case 'en-jm':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-jm', 'en-gb');
      break;

    case 'en-ke':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-ke', 'en-gb');
      break;

    case 'en-ki':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-ki', 'en-gb');
      break;

    case 'en-kn':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-kn', 'en-gb');
      break;

    case 'en-ky':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-ky', 'en-gb');
      break;

    case 'en-lc':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-lc', 'en-gb');
      break;

    case 'en-lr':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-lr', 'en-gb');
      break;

    case 'en-ls':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-ls', 'en-gb');
      break;

    case 'en-mg':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-mg', 'en-gb');
      break;

    case 'en-ms':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-ms', 'en-gb');
      break;

    case 'en-mt':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-mt', 'en-gb');
      break;

    case 'en-mu':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-mu', 'en-gb');
      break;

    case 'en-mw':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-mw', 'en-gb');
      break;

    case 'en-na':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-na', 'en-gb');
      break;

    case 'en-nf':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-nf', 'en-gb');
      break;

    case 'en-ng':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-ng', 'en-gb');
      break;

    case 'en-nr':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-nr', 'en-gb');
      break;

    case 'en-nu':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-nu', 'en-gb');
      break;

    case 'en-nz':
      await import('moment/dist/locale/en-nz');
      break;

    case 'en-pg':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-pg', 'en-gb');
      break;

    case 'en-ph':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-ph', 'en-gb');
      break;

    case 'en-pk':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-pk', 'en-gb');
      break;

    case 'en-pn':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-pn', 'en-gb');
      break;

    case 'en-rw':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-rw', 'en-gb');
      break;

    case 'en-sb':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-sb', 'en-gb');
      break;

    case 'en-sc':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-sc', 'en-gb');
      break;

    case 'en-sd':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-sd', 'en-gb');
      break;

    case 'en-sg':
      await import('moment/dist/locale/en-sg');
      break;

    case 'en-sh':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-sh', 'en-gb');
      break;

    case 'en-sl':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-sl', 'en-gb');
      break;

    case 'en-ss':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-ss', 'en-gb');
      break;

    case 'en-sx':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-sx', 'en-gb');
      break;

    case 'en-sz':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-sz', 'en-gb');
      break;

    case 'en-tc':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-tc', 'en-gb');
      break;

    case 'en-tk':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-tk', 'en-gb');
      break;

    case 'en-to':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-to', 'en-gb');
      break;

    case 'en-tt':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-tt', 'en-gb');
      break;

    case 'en-tv':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-tv', 'en-gb');
      break;

    case 'en-tz':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-tz', 'en-gb');
      break;

    case 'en-ug':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-ug', 'en-gb');
      break;

    case 'en-vc':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-vc', 'en-gb');
      break;

    case 'en-vg':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-vg', 'en-gb');
      break;

    case 'en-vu':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-vu', 'en-gb');
      break;

    case 'en-ws':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-ws', 'en-gb');
      break;

    case 'en-za':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-za', 'en-gb');
      break;

    case 'en-zm':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-zm', 'en-gb');
      break;

    case 'en-zw':
      await import('moment/dist/locale/en-gb');
      await defineLocaleIfNeeded('en-zw', 'en-gb');
      break;

    case 'es':
      await import('moment/dist/locale/es');
      break;

    case 'es-ar':
      await import('moment/dist/locale/es');
      await defineLocaleIfNeeded('es-ar', 'es');
      break;

    case 'es-bo':
      await import('moment/dist/locale/es');
      await defineLocaleIfNeeded('es-bo', 'es');
      break;

    case 'es-cl':
      await import('moment/dist/locale/es');
      await defineLocaleIfNeeded('es-cl', 'es');
      break;

    case 'es-co':
      await import('moment/dist/locale/es');
      await defineLocaleIfNeeded('es-co', 'es');
      break;

    case 'es-cr':
      await import('moment/dist/locale/es');
      await defineLocaleIfNeeded('es-cr', 'es');
      break;

    case 'es-cu':
      await import('moment/dist/locale/es');
      await defineLocaleIfNeeded('es-cu', 'es');
      break;

    case 'es-do':
      await import('moment/dist/locale/es-do');
      break;

    case 'es-ea':
      await import('moment/dist/locale/es');
      await defineLocaleIfNeeded('es-ea', 'es');
      break;

    case 'es-ec':
      await import('moment/dist/locale/es');
      await defineLocaleIfNeeded('es-ec', 'es');
      break;

    case 'es-es':
      await import('moment/dist/locale/es');
      await defineLocaleIfNeeded('es-es', 'es');
      break;

    case 'es-gq':
      await import('moment/dist/locale/es');
      await defineLocaleIfNeeded('es-gq', 'es');
      break;

    case 'es-gt':
      await import('moment/dist/locale/es');
      await defineLocaleIfNeeded('es-gt', 'es');
      break;

    case 'es-hn':
      await import('moment/dist/locale/es');
      await defineLocaleIfNeeded('es-hn', 'es');
      break;

    case 'es-ic':
      await import('moment/dist/locale/es');
      await defineLocaleIfNeeded('es-ic', 'es');
      break;

    case 'es-mx':
      await import('moment/dist/locale/es-mx');
      break;

    case 'es-ni':
      await import('moment/dist/locale/es');
      await defineLocaleIfNeeded('es-ni', 'es');
      break;

    case 'es-pa':
      await import('moment/dist/locale/es');
      await defineLocaleIfNeeded('es-pa', 'es');
      break;

    case 'es-pe':
      await import('moment/dist/locale/es');
      await defineLocaleIfNeeded('es-pe', 'es');
      break;

    case 'es-pr':
      await import('moment/dist/locale/es');
      await defineLocaleIfNeeded('es-pr', 'es');
      break;

    case 'es-py':
      await import('moment/dist/locale/es');
      await defineLocaleIfNeeded('es-py', 'es');
      break;

    case 'es-sv':
      await import('moment/dist/locale/es');
      await defineLocaleIfNeeded('es-sv', 'es');
      break;

    case 'es-uy':
      await import('moment/dist/locale/es');
      await defineLocaleIfNeeded('es-uy', 'es');
      break;

    case 'es-ve':
      await import('moment/dist/locale/es');
      await defineLocaleIfNeeded('es-ve', 'es');
      break;

    case 'fr-fr':
      await import('moment/dist/locale/fr');
      await defineLocaleIfNeeded('fr-fr', 'fr');
      break;

    case 'pt-br':
      await import('moment/dist/locale/pt-br');
      break;

    default:
      break;
  };
};

export default loadMomentLocales;