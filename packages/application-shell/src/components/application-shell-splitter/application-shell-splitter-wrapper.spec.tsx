import * as React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import * as ReactRouterDom from 'react-router-dom';
import { MC_MAIN_CONTAINER_PORTAL_ID } from '@commercetools-frontend/constants';

const { MemoryRouter } = ReactRouterDom;

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

    it('source keeps a SaveToolbar portal in the passthrough and Suspense fallback', () => {
      const fs = require('fs');
      const path = require('path');
      const source = fs.readFileSync(
        path.join(__dirname, 'application-shell-splitter.async.tsx'),
        'utf8'
      );

      expect(source).toContain('FallbackSaveToolbarPortal');
      expect(source).toContain('MC_MAIN_CONTAINER_PORTAL_ID');
      expect(source).toContain('position: fixed');
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

    describe('runtime DOM', () => {
      // The lazy component caches its import result at module level, so load
      // a fresh copy of the wrapper per test. React and react-router-dom are
      // pinned to this file's instances so hooks and router context work.
      const loadWrapper = () => {
        let Wrapper: typeof import('./application-shell-splitter.async').default;
        jest.isolateModules(() => {
          jest.doMock('react', () => React);
          jest.doMock('react-router-dom', () => ReactRouterDom);
          Wrapper = require('./application-shell-splitter.async').default;
        });
        return Wrapper!;
      };

      const renderWrapper = () => {
        const Wrapper = loadWrapper();
        return render(
          <MemoryRouter>
            <Wrapper locale="en">
              <div data-testid="child">child</div>
            </Wrapper>
          </MemoryRouter>
        );
      };

      const expectPortal = (container: HTMLElement) => {
        // The portal target only has an id (no test id), so query by id.
        // eslint-disable-next-line testing-library/no-node-access
        const portal = container.querySelector(
          `div#${MC_MAIN_CONTAINER_PORTAL_ID}`
        );
        expect(portal).toBeInTheDocument();
      };

      afterEach(() => {
        jest.dontMock('./application-shell-splitter');
        jest.resetModules();
      });

      it('renders the save toolbar portal and children when the chunk fails to load', async () => {
        jest.doMock('./application-shell-splitter', () => {
          throw new Error('Loading chunk application-shell-splitter failed');
        });

        const { container, getByTestId } = renderWrapper();

        await waitFor(() => {
          expect(getByTestId('child')).toBeInTheDocument();
        });
        expectPortal(container);
      });

      it('renders the save toolbar portal and children while the chunk is still loading', async () => {
        jest.doMock('./application-shell-splitter', () => ({
          __esModule: true,
          hasNimbus: false,
          default: () => null,
        }));

        const { container, getByTestId } = renderWrapper();

        // Asserted synchronously, before the lazy import settles, so the
        // Suspense fallback is what is mounted.
        expect(getByTestId('child')).toBeInTheDocument();
        expectPortal(container);

        // Let the pending import settle inside act to avoid stray warnings.
        await act(() => Promise.resolve());
      });
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
