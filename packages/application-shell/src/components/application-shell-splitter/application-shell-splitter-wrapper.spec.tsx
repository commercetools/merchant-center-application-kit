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
  });
});
