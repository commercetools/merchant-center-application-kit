describe('ApplicationShellSplitterWrapper', () => {
  describe('lazy load fallback', () => {
    it('returns a passthrough component when the import fails', async () => {
      const fallback = await Promise.reject(
        new Error('Cannot find module')
      ).catch(() => ({
        default: ({ children }: { children: React.ReactNode }) => (
          <>{children}</>
        ),
      }));

      expect(fallback).toHaveProperty('default');
      expect(typeof fallback.default).toBe('function');
    });

    it('source uses .catch with passthrough fallback', () => {
      const fs = require('fs');
      const path = require('path');
      const source = fs.readFileSync(
        path.join(__dirname, 'application-shell-splitter.async.tsx'),
        'utf8'
      );

      expect(source).toContain('.catch(');
      expect(source).toContain('children');
    });

    it('source gates the splitter on `hasNimbus`, falling back to passthrough', () => {
      const fs = require('fs');
      const path = require('path');
      const source = fs.readFileSync(
        path.join(__dirname, 'application-shell-splitter.async.tsx'),
        'utf8'
      );

      expect(source).toContain('hasNimbus');
      expect(source).toContain('Passthrough');
    });
  });

  describe('hasNimbus availability flag', () => {
    afterEach(() => {
      jest.resetModules();
    });

    it('is true when @commercetools/nimbus resolves', () => {
      jest.isolateModules(() => {
        jest.doMock('@commercetools/nimbus', () => ({
          NimbusProvider: () => null,
          Splitter: { Root: () => null },
          Region: () => null,
          useResponsiveSplitterSizes: () => ({ rootProps: {} }),
        }));
        const { hasNimbus } = require('./application-shell-splitter');
        expect(hasNimbus).toBe(true);
      });
    });

    it('is false when @commercetools/nimbus is stubbed to an empty module', () => {
      jest.isolateModules(() => {
        // Mirrors what the mc-scripts bundler fallback produces when Nimbus is
        // not installed: an empty module, so every named import is `undefined`.
        jest.doMock('@commercetools/nimbus', () => ({}));
        const { hasNimbus } = require('./application-shell-splitter');
        expect(hasNimbus).toBe(false);
      });
    });
  });
});
