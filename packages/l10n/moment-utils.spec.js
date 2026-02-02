const moment = require('moment-timezone');
const { getListOfSupportedMomentLocales } = require('./moment-utils');

// We need to access the internal function for testing
const momentUtils = require('./moment-utils');

// Helper to get the mapping for a specific locale
function getMomentLocaleFor(locale) {
  const code = momentUtils.generateMomentLocaleImports();

  // Parse the generated code to find the mapping for our locale
  const regex = new RegExp(
    `case '${locale.toLowerCase()}':\\s*await import\\('moment/dist/locale/([^']+)'\\)`,
    's'
  );
  const match = code.match(regex);

  if (match) {
    return match[1];
  }

  // Check if locale is in the code at all (it might be excluded intentionally)
  const caseRegex = new RegExp(`case '${locale.toLowerCase()}':`);
  if (!caseRegex.test(code)) {
    return null; // Locale not included, will use moment default
  }

  return undefined; // Unexpected state
}

// Helper to check if the generated code includes defineLocaleIfNeeded for a given locale
function hasDefineLocaleFor(locale) {
  const code = momentUtils.generateMomentLocaleImports();
  const regex = new RegExp(
    `defineLocaleIfNeeded\\('${locale.toLowerCase()}', '[^']+'\\)`
  );
  return regex.test(code);
}

// Helper to get the parent locale from defineLocaleIfNeeded call
function getParentLocaleFor(locale) {
  const code = momentUtils.generateMomentLocaleImports();
  const regex = new RegExp(
    `defineLocaleIfNeeded\\('${locale.toLowerCase()}', '([^']+)'\\)`
  );
  const match = code.match(regex);
  return match ? match[1] : null;
}

describe('moment-utils', () => {
  describe('English locale mappings', () => {
    describe('non-US English locales without native moment support', () => {
      it('en-BE (Belgium) should use en-gb (DD/MM/YYYY format)', () => {
        // These locales should use British date format, not US format
        expect(getMomentLocaleFor('en-BE')).toBe('en-gb');
      });

      it('en-MT (Malta) should use en-gb (DD/MM/YYYY format)', () => {
        expect(getMomentLocaleFor('en-MT')).toBe('en-gb');
      });

      it('en-ZA (South Africa) should use en-gb (DD/MM/YYYY format)', () => {
        expect(getMomentLocaleFor('en-ZA')).toBe('en-gb');
      });
    });

    describe('plain English without region', () => {
      it('en (plain) should use moment default (not included in mappings)', () => {
        // Plain 'en' without a region code should not load any locale
        expect(getMomentLocaleFor('en')).toBe(null);
      });
    });

    describe('US and US territories', () => {
      it('en-US should use moment default (not included in mappings)', () => {
        expect(getMomentLocaleFor('en-US')).toBe(null);
      });

      it('en-PR (Puerto Rico) should use moment default', () => {
        expect(getMomentLocaleFor('en-PR')).toBe(null);
      });

      it('en-VI (US Virgin Islands) should use moment default', () => {
        expect(getMomentLocaleFor('en-VI')).toBe(null);
      });
    });

    describe('English locales with native moment support', () => {
      it('en-AU (Australia) should use en-au', () => {
        expect(getMomentLocaleFor('en-AU')).toBe('en-au');
      });

      it('en-GB (Great Britain) should use en-gb', () => {
        expect(getMomentLocaleFor('en-GB')).toBe('en-gb');
      });

      it('en-IE (Ireland) should use en-ie', () => {
        expect(getMomentLocaleFor('en-IE')).toBe('en-ie');
      });

      it('en-CA (Canada) should use en-ca', () => {
        expect(getMomentLocaleFor('en-CA')).toBe('en-ca');
      });
    });
  });

  describe('defineLocale generation for non-exact matches', () => {
    describe('non-US English locales should define child locales', () => {
      it('en-BE should have defineLocale with parentLocale en-gb', () => {
        expect(hasDefineLocaleFor('en-BE')).toBe(true);
        expect(getParentLocaleFor('en-BE')).toBe('en-gb');
      });

      it('en-MT should have defineLocale with parentLocale en-gb', () => {
        expect(hasDefineLocaleFor('en-MT')).toBe(true);
        expect(getParentLocaleFor('en-MT')).toBe('en-gb');
      });

      it('en-ZA should have defineLocale with parentLocale en-gb', () => {
        expect(hasDefineLocaleFor('en-ZA')).toBe(true);
        expect(getParentLocaleFor('en-ZA')).toBe('en-gb');
      });
    });

    describe('exact moment locale matches should NOT have defineLocale', () => {
      it('en-GB should NOT have defineLocale (exact match)', () => {
        expect(hasDefineLocaleFor('en-GB')).toBe(false);
      });

      it('en-AU should NOT have defineLocale (exact match)', () => {
        expect(hasDefineLocaleFor('en-AU')).toBe(false);
      });

      it('en-IE should NOT have defineLocale (exact match)', () => {
        expect(hasDefineLocaleFor('en-IE')).toBe(false);
      });

      it('en-CA should NOT have defineLocale (exact match)', () => {
        expect(hasDefineLocaleFor('en-CA')).toBe(false);
      });
    });

    describe('German locales without exact match should define child locales', () => {
      it('de-BE should have defineLocale with parentLocale de', () => {
        expect(hasDefineLocaleFor('de-BE')).toBe(true);
        expect(getParentLocaleFor('de-BE')).toBe('de');
      });

      it('de-DE should have defineLocale with parentLocale de', () => {
        expect(hasDefineLocaleFor('de-DE')).toBe(true);
        expect(getParentLocaleFor('de-DE')).toBe('de');
      });
    });

    describe('exact German locale matches should NOT have defineLocale', () => {
      it('de should NOT have defineLocale (exact match)', () => {
        expect(hasDefineLocaleFor('de')).toBe(false);
      });

      it('de-AT should NOT have defineLocale (exact match)', () => {
        expect(hasDefineLocaleFor('de-AT')).toBe(false);
      });

      it('de-CH should NOT have defineLocale (exact match)', () => {
        expect(hasDefineLocaleFor('de-CH')).toBe(false);
      });
    });
  });

  describe('moment integration - date formatting', () => {
    // These tests simulate what happens after loadMomentLocales runs
    // Note: We use moment/locale/ (CJS) instead of moment/dist/locale/ (ESM)
    // since Jest doesn't support ESM imports in node_modules by default
    beforeEach(() => {
      // Reset moment to default state before each test
      moment.locale('en');
    });

    it('en-BE should format dates as DD/MM/YYYY after defineLocale', () => {
      // Simulate what the generated code does:
      // 1. Load en-gb locale (using CJS path for Jest compatibility)
      require('moment/locale/en-gb');
      // 2. Define en-be as child of en-gb
      if (!moment.locales().includes('en-be')) {
        moment.defineLocale('en-be', { parentLocale: 'en-gb' });
      }

      // Verify the locale is registered
      expect(moment.locales()).toContain('en-be');

      // Verify date formatting uses DD/MM/YYYY
      const formatted = moment('2026-01-29').locale('en-be').format('L');
      expect(formatted).toBe('29/01/2026');
    });

    it('en-MT should format dates as DD/MM/YYYY after defineLocale', () => {
      require('moment/locale/en-gb');
      if (!moment.locales().includes('en-mt')) {
        moment.defineLocale('en-mt', { parentLocale: 'en-gb' });
      }

      expect(moment.locales()).toContain('en-mt');
      const formatted = moment('2026-01-29').locale('en-mt').format('L');
      expect(formatted).toBe('29/01/2026');
    });

    it('en-ZA should format dates as DD/MM/YYYY after defineLocale', () => {
      require('moment/locale/en-gb');
      if (!moment.locales().includes('en-za')) {
        moment.defineLocale('en-za', { parentLocale: 'en-gb' });
      }

      expect(moment.locales()).toContain('en-za');
      const formatted = moment('2026-01-29').locale('en-za').format('L');
      expect(formatted).toBe('29/01/2026');
    });

    it('en (US default) should format dates as MM/DD/YYYY', () => {
      // Without loading any locale, moment defaults to US format
      const formatted = moment('2026-01-29').locale('en').format('L');
      expect(formatted).toBe('01/29/2026');
    });

    it('en-GB should format dates as DD/MM/YYYY (exact match)', () => {
      require('moment/locale/en-gb');
      const formatted = moment('2026-01-29').locale('en-gb').format('L');
      expect(formatted).toBe('29/01/2026');
    });
  });

  describe('getListOfSupportedMomentLocales', () => {
    it('should return a list of unique moment locale identifiers', () => {
      const locales = getListOfSupportedMomentLocales();
      expect(Array.isArray(locales)).toBe(true);
      expect(locales.length).toBeGreaterThan(0);
      // Should include en-gb for British format
      expect(locales).toContain('en-gb');
    });
  });
});
