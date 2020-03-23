/**
 * NOTE: this is a copy of https://github.com/eemeli/intl-pluralrules
 * as the package is shipped with ES6 code.
 */
const pluralRules = require('make-plural/plurals');
const pluralCategories = require('make-plural/pluralCategories');

// does not check for duplicate subtags
const isStructurallyValidLanguageTag = (locale) =>
  locale.split('-').every((subtag) => /[a-z0-9]+/i.test(subtag));

const canonicalizeLocaleList = (locales) => {
  if (!locales) return [];
  if (!Array.isArray(locales)) locales = [locales];
  const res = {};
  for (let i = 0; i < locales.length; ++i) {
    let tag = locales[i];
    if (tag && typeof tag === 'object') tag = String(tag);
    if (typeof tag !== 'string') {
      // Requiring tag to be a String or Object means that the Number value
      // NaN will not be interpreted as the language tag "nan", which stands
      // for Min Nan Chinese.
      const msg = `Locales should be strings, ${JSON.stringify(tag)} isn't.`;
      throw new TypeError(msg);
    }
    if (tag.startsWith('*')) continue;
    if (!isStructurallyValidLanguageTag(tag)) {
      const strTag = JSON.stringify(tag);
      const msg = `The locale ${strTag} is not a structurally valid BCP 47 language tag.`;
      throw new RangeError(msg);
    }
    res[tag] = true;
  }
  return Object.keys(res);
};

const defaultLocale = () =>
  (typeof navigator !== 'undefined' &&
    navigator &&
    (navigator.userLanguage || navigator.language)) ||
  'en-US';

const findLocale = (locale) => {
  do {
    if (pluralRules[locale]) return locale;
    locale = locale.replace(/-?[^-]*$/, '');
  } while (locale);
  return null;
};

const resolveLocale = (locales) => {
  const canonicalLocales = canonicalizeLocaleList(locales);
  for (let i = 0; i < canonicalLocales.length; ++i) {
    const lc = findLocale(canonicalLocales[i]);
    if (lc) return lc;
  }
  return findLocale(defaultLocale());
};

const getType = (type) => {
  if (!type) return 'cardinal';
  if (type === 'cardinal' || type === 'ordinal') return type;
  throw new RangeError('Not a valid plural type: ' + JSON.stringify(type));
};

class PluralRules {
  static supportedLocalesOf(locales) {
    return canonicalizeLocaleList(locales).filter(findLocale);
  }

  constructor(locales, opt = {}) {
    this._locale = resolveLocale(locales);
    this._type = getType(opt.type);
    if (typeof Intl === 'object' && Intl.NumberFormat) {
      // make-plural expects latin digits with . decimal separator
      this._nf = new Intl.NumberFormat('en', opt);
    } else {
      const {
        minimumIntegerDigits: minID,
        minimumFractionDigits: minFD,
        maximumFractionDigits: maxFD,
        minimumSignificantDigits: minSD,
        maximumSignificantDigits: maxSD,
      } = opt;
      this._minID = typeof minID === 'number' ? minID : 1;
      this._minFD = typeof minFD === 'number' ? minFD : 0;
      this._maxFD =
        typeof maxFD === 'number' ? maxFD : Math.max(this._minFD, 3);
      if (typeof minSD === 'number' || typeof maxSD === 'number') {
        this._minSD = typeof minSD === 'number' ? minSD : 1;
        this._maxSD = typeof maxSD === 'number' ? maxSD : 21;
      }
    }
  }

  resolvedOptions() {
    const nfOpt = this._nf && this._nf.resolvedOptions();
    const opt = {
      locale: this._locale,
      minimumIntegerDigits: nfOpt ? nfOpt.minimumIntegerDigits : this._minID,
      minimumFractionDigits: nfOpt ? nfOpt.minimumFractionDigits : this._minFD,
      maximumFractionDigits: nfOpt ? nfOpt.maximumFractionDigits : this._maxFD,
      pluralCategories: pluralCategories[this._locale][this._type],
      type: this._type,
    };
    if (nfOpt && typeof nfOpt.minimumSignificantDigits === 'number') {
      opt.minimumSignificantDigits = nfOpt.minimumSignificantDigits;
      opt.maximumSignificantDigits = nfOpt.maximumSignificantDigits;
    } else if (typeof this._minSD === 'number') {
      opt.minimumSignificantDigits = this._minSD;
      opt.maximumSignificantDigits = this._maxSD;
    }
    return opt;
  }

  _format(n) {
    if (this._nf) return this._nf.format(n);
    if (this._minSD) {
      const raw = String(n);
      let prec = 0;
      for (let i = 0; i < raw.length; ++i) {
        const c = raw[i];
        if (c >= '0' && c <= '9') ++prec;
      }
      if (prec < this._minSD) return n.toPrecision(this._minSD);
      if (prec > this._maxSD) return n.toPrecision(this._maxSD);
      return raw;
    }
    if (this._minFD > 0) return n.toFixed(this._minFD);
    if (this._maxFD === 0) return n.toFixed(0);
    return String(n);
  }

  select(number) {
    if (typeof number !== 'number') number = Number(number);
    if (!isFinite(number)) return 'other';
    const fmt = this._format(Math.abs(number));
    return pluralRules[this._locale](fmt, this._type === 'ordinal');
  }
}
module.exports = PluralRules;
