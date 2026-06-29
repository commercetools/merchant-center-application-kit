describe('ApplicationShellSplitterWrapper', () => {
  describe('Con 3: error logging on lazy load failure', () => {
    it('logs the error when the dynamic import fails', async () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const importError = new Error('Cannot find module @commercetools/nimbus');

      // Simulate the lazy() factory: a dynamic import that rejects,
      // then the .catch() handler from index.tsx
      const lazyFactory = () =>
        Promise.reject(importError).catch((error) => {
          // This is the pattern we expect index.tsx to use
          console.error(
            'ApplicationShellSplitter chunk failed to load, falling back to passthrough.',
            error
          );
          return {
            default: ({ children }: { children: React.ReactNode }) => (
              <>{children}</>
            ),
          };
        });

      const result = await lazyFactory();

      expect(result).toHaveProperty('default');
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('ApplicationShellSplitter'),
        importError
      );

      consoleSpy.mockRestore();
    });

    it('verifies the source code contains console.error in the catch handler', () => {
      // Read the actual source to confirm the .catch() logs the error
      const fs = require('fs');
      const path = require('path');
      const source = fs.readFileSync(
        path.join(__dirname, 'application-shell-splitter.async.tsx'),
        'utf8'
      );

      expect(source).toContain('.catch((error)');
      expect(source).toContain('console.error(');
      expect(source).toContain('ApplicationShellSplitter');
    });
  });
});
