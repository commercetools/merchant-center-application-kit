import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import AsyncChunkLoader from './async-chunk-loader';

jest.mock('@commercetools-frontend/sentry');

describe('rendering', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('when there is an error', () => {
    it('should render error page', async () => {
      const rendered = render(
        <IntlProvider locale="en" messages={{}}>
          <AsyncChunkLoader error={new Error('Oops')} />
        </IntlProvider>
      );
      await rendered.findByText('Sorry! An unexpected error occured.');
      expect(reportErrorToSentry).toHaveBeenCalled();
    });
  });
  describe('when there is no error and the delay is already exceeded', () => {
    it('should render loading page', async () => {
      const rendered = render(
        <IntlProvider locale="en" messages={{}}>
          <AsyncChunkLoader pastDelay={true} />
        </IntlProvider>
      );
      await rendered.findByTestId('application-loader');
      expect(reportErrorToSentry).not.toHaveBeenCalled();
    });
  });
  describe('when there is no error and the delay is not being exceded', () => {
    it('should render nothing', () => {
      const rendered = render(<AsyncChunkLoader pastDelay={false} />);
      expect(
        rendered.queryByTestId('application-loader')
      ).not.toBeInTheDocument();
      expect(reportErrorToSentry).not.toHaveBeenCalled();
    });
  });
});
