import React from 'react';
import { render } from '@testing-library/react';
import { FormattedMessage } from 'react-intl';
import ConfigureIntlProvider from './configure-intl-provider';

describe('rendering', () => {
  let rendered;
  describe('when locale is defined and there is a translation', () => {
    beforeEach(() => {
      rendered = render(
        <ConfigureIntlProvider locale="de" messages={{ title: 'Auto' }}>
          <FormattedMessage id="title" defaultMessage="Car" />
        </ConfigureIntlProvider>
      );
    });
    it('should render translated message', () => {
      expect(rendered.queryByText('Auto')).toBeInTheDocument();
    });
  });
  describe('when locale is defined but there is no translation', () => {
    beforeEach(() => {
      console.error = jest.fn();
      rendered = render(
        <ConfigureIntlProvider locale="it" messages={{}}>
          <FormattedMessage id="title" defaultMessage="Car" />
        </ConfigureIntlProvider>
      );
    });
    it('should render default message', () => {
      expect(rendered.queryByText('Car')).toBeInTheDocument();
    });
  });
  describe('when locale is not defined', () => {
    beforeEach(() => {
      rendered = render(
        <ConfigureIntlProvider>
          <FormattedMessage id="title" defaultMessage="Car" />
        </ConfigureIntlProvider>
      );
    });
    it('should render nothing', () => {
      expect(rendered.queryByText('Car')).not.toBeInTheDocument();
    });
  });
});
