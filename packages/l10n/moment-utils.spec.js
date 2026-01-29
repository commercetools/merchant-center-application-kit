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
