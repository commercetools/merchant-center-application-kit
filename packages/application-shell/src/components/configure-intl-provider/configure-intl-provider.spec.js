import React from 'react';
import { screen, render } from '@testing-library/react';
import { FormattedMessage } from 'react-intl';
import ConfigureIntlProvider from './configure-intl-provider';

describe('rendering', () => {
  describe('when locale is defined and there is a translation', () => {
    it('should render translated message', () => {
      render(
        <ConfigureIntlProvider locale="de" messages={{ title: 'Auto' }}>
          <FormattedMessage id="title" defaultMessage="Car" />
        </ConfigureIntlProvider>
      );
      expect(screen.getByText('Auto')).toBeInTheDocument();
    });
  });
  describe('when locale is defined but there is no translation', () => {
    beforeEach(() => {
      console.error = jest.fn();
    });
    it('should render default message', () => {
      render(
        <ConfigureIntlProvider locale="it" messages={{}}>
          <FormattedMessage id="title" defaultMessage="Car" />
        </ConfigureIntlProvider>
      );
      expect(screen.getByText('Car')).toBeInTheDocument();
    });
  });
  describe('when locale is not defined', () => {
    it('should render nothing', () => {
      render(
        <ConfigureIntlProvider>
          <FormattedMessage id="title" defaultMessage="Car" />
        </ConfigureIntlProvider>
      );
      expect(screen.queryByText('Car')).not.toBeInTheDocument();
    });
  });
});
