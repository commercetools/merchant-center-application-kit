import createFingerprint from './create-fingerprint';

const TEMPLATE =
  '<html><script src="__CDN_URL__index-abc123.js"></script></html>';

describe('createFingerprint', () => {
  describe('from the deploy revision', () => {
    it('uses a non-empty revision verbatim', () => {
      expect(
        createFingerprint({
          revision: 'a1b2c3d4e5f6',
          indexHtmlTemplate: TEMPLATE,
        })
      ).toBe('a1b2c3d4e5f6');
    });

    it.each(['', '   ', undefined])(
      'falls back to the template when the revision is %p',
      (revision) => {
        const fingerprint = createFingerprint({
          revision,
          indexHtmlTemplate: TEMPLATE,
        });
        expect(fingerprint).not.toBe(revision);
        expect(fingerprint).not.toHaveLength(0);
      }
    );

    it.each(['release/v2', 'build #7', 'a".b', 'x'.repeat(65)])(
      'rejects %p rather than letting it reach a cache key',
      (revision) => {
        expect(() =>
          createFingerprint({ revision, indexHtmlTemplate: TEMPLATE })
        ).toThrow(/revision/i);
      }
    );
  });

  describe('from the template content', () => {
    it('is stable for the same template', () => {
      const a = createFingerprint({ indexHtmlTemplate: TEMPLATE });
      const b = createFingerprint({ indexHtmlTemplate: TEMPLATE });
      expect(a).toBe(b);
    });

    it('changes when the template changes by one character', () => {
      expect(createFingerprint({ indexHtmlTemplate: TEMPLATE })).not.toBe(
        createFingerprint({ indexHtmlTemplate: `${TEMPLATE} ` })
      );
    });

    it.each(['', '  \n  '])('throws on a %p template', (indexHtmlTemplate) => {
      expect(() => createFingerprint({ indexHtmlTemplate })).toThrow(
        /template/i
      );
    });
  });

  it('only ever returns URL-safe characters, since it becomes a cache key', () => {
    // Standard base64 would emit `+`, `/` and `=`, which is why this does not
    // reuse `create-asset-hash`.
    const templates = Array.from({ length: 40 }, (_, i) => `${TEMPLATE}${i}`);
    templates.forEach((indexHtmlTemplate) => {
      expect(createFingerprint({ indexHtmlTemplate })).toMatch(
        /^[A-Za-z0-9_-]+$/
      );
    });
  });
});
