import { mocked } from 'ts-jest/utils';
import React from 'react';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import { render, wait } from '@testing-library/react';
import loadI18n from '../load-i18n';
import AsyncLocaleData, {
  State,
  Props,
  TMessageTranslations,
} from './async-locale-data';

jest.mock('@commercetools-frontend/sentry');

jest.mock('../load-i18n');

type ChildComponentProps = {
  locale?: string;
  messages?: TMessageTranslations;
};
const ChildComponent = (props: ChildComponentProps) => {
  if (props.locale && props.messages) {
    return (
      <>
        <div>{`Locale: ${props.locale}`}</div>
        <div>{`Messages: ${props.messages['CustomApp.title']}`}</div>
      </>
    );
  }
  return <div>{'Nothing'}</div>;
};

const createTestProps = (props: Partial<Props> = {}) => ({
  locale: 'en-US',
  applicationMessages: {
    en: { 'CustomApp.title': 'Custom title en' },
  },
  // eslint-disable-next-line react/display-name
  children: (state: State) => <ChildComponent {...state} />,
  ...props,
});

describe('rendering', () => {
  let props: Props;
  describe('if there is an error', () => {
    let error: Error;
    beforeEach(() => {
      error = new Error('oh no!');
      mocked(loadI18n).mockClear();
      mocked(loadI18n).mockImplementation(jest.fn(() => Promise.reject(error)));
      props = createTestProps();
    });
    it('should report the error to sentry', async () => {
      const { container } = render(<AsyncLocaleData {...props} />);
      await wait(() => {
        expect(container).toHaveTextContent('Nothing');
        expect(reportErrorToSentry).toHaveBeenCalledWith(error, {});
      });
    });
  });

  describe('if there is no error', () => {
    beforeEach(() => {
      mocked(loadI18n).mockClear();
      mocked(loadI18n).mockImplementation(
        jest.fn(() => Promise.resolve({ title: 'Title en' }))
      );
      props = createTestProps();
    });
    it('should render children with state', async () => {
      const { container } = render(<AsyncLocaleData {...props} />);
      await wait(() => {
        expect(container).toHaveTextContent('Locale: en-US');
        expect(container).toHaveTextContent('Messages: Custom title en');
      });
    });
  });

  describe('when applicationMessages is a function', () => {
    beforeEach(() => {
      mocked(loadI18n).mockClear();
      mocked(loadI18n).mockClear();
      mocked(loadI18n).mockImplementation(
        jest.fn(() => Promise.resolve({ title: 'Title en' }))
      );
      props = createTestProps({
        locale: 'en-CA',
        applicationMessages: jest
          .fn(() => Promise.resolve({ 'CustomApp.title': 'New title en' }))
          .mockName('applicationMessages'),
      });
    });
    it('should render children with state', async () => {
      const { container } = render(<AsyncLocaleData {...props} />);
      await wait(() => {
        expect(container).toHaveTextContent('Locale: en-CA');
        expect(container).toHaveTextContent('Messages: New title en');
      });
    });
  });

  describe('when locale is not defined', () => {
    beforeEach(() => {
      mocked(loadI18n).mockClear();
      props = createTestProps();
    });
    it('should render without values', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { locale, ...withoutLocale } = props;
      const { container } = render(<AsyncLocaleData {...withoutLocale} />);
      await wait(() => {
        expect(container).toHaveTextContent('Nothing');
      });
    });
  });
});
