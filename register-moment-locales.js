// We need to import the moment locales (language + country) for each
// supported language (en, de).
// NOTE: when you add a new language, ensure to update the `MomentLocalesPlugin`
// in the webpack config.

// EN
import 'moment/locale/en-au';
import 'moment/locale/en-ca';
import 'moment/locale/en-gb';
import 'moment/locale/en-ie';
import 'moment/locale/en-il';
import 'moment/locale/en-nz';

// DE
import 'moment/locale/de';
import 'moment/locale/de-at';
import 'moment/locale/de-ch';

// ES
import 'moment/locale/es';
import 'moment/locale/es-us';
import 'moment/locale/es-do';
