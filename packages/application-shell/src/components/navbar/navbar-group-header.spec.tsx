import { NimbusProvider } from '@commercetools/nimbus';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import NavbarGroupHeader from './navbar-group-header';

const renderWithIntl = (ui: React.ReactElement) =>
  render(<IntlProvider locale="en">{ui}</IntlProvider>);

describe('NavbarGroupHeader', () => {
  it('renders the label', () => {
    renderWithIntl(<NavbarGroupHeader label="Agent Sphere" />);

    expect(screen.getByText('Agent Sphere')).toBeInTheDocument();
  });

  it('does not render the badge when isNew is false', () => {
    renderWithIntl(<NavbarGroupHeader label="Agent Sphere" isNew={false} />);

    expect(screen.queryByText('New')).not.toBeInTheDocument();
  });

  it('renders the badge without a surrounding NimbusProvider', () => {
    renderWithIntl(<NavbarGroupHeader label="Agent Sphere" isNew />);

    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders the badge once inside a NimbusProvider', () => {
    renderWithIntl(
      <NimbusProvider locale="en" loadFonts={false}>
        <NavbarGroupHeader label="Agent Sphere" isNew />
      </NimbusProvider>
    );

    expect(screen.getAllByText('New')).toHaveLength(1);
  });

  describe('when Nimbus is not installed', () => {
    afterEach(() => {
      jest.resetModules();
    });

    it('does not render the badge', () => {
      jest.isolateModules(() => {
        // Mirrors what the mc-scripts bundler fallback produces when Nimbus is
        // not installed: an empty module, so every named import is `undefined`.
        jest.doMock('@commercetools/nimbus', () => ({}));
        // Require React from the isolated registry so the component and the
        // renderer share a single React instance.
        const { act, createElement } = require('react');
        const { createRoot } = require('react-dom/client');
        const { IntlProvider: IsolatedIntlProvider } = require('react-intl');
        const IsolatedNavbarGroupHeader =
          require('./navbar-group-header').default;

        const container = document.createElement('div');
        const root = createRoot(container);
        // Testing Library cannot be required inside `isolateModules`, so drive
        // React's `act` directly.
        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => {
          root.render(
            createElement(
              IsolatedIntlProvider,
              { locale: 'en' },
              createElement(IsolatedNavbarGroupHeader, {
                label: 'Agent Sphere',
                isNew: true,
              })
            )
          );
        });

        expect(container).toHaveTextContent('Agent Sphere');
        expect(container).not.toHaveTextContent('New');
        act(() => root.unmount());
      });
    });
  });
});
