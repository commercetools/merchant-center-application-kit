import { mocked } from 'jest-mock';
import { act, render, waitFor } from '@testing-library/react';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import type { TMessageTranslations } from '../export-types';
import loadI18n from '../load-i18n';
import type { TRenderFunctionResult, Props } from './async-locale-data';
import { AsyncLocaleData } from './async-locale-data';

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
  children: (result: TRenderFunctionResult) => <ChildComponent {...result} />,
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
      await waitFor(() => {
        expect(container).toHaveTextContent('Nothing');
      });
      expect(reportErrorToSentry).toHaveBeenCalledWith(error, {});
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
      await waitFor(() => {
        expect(container).toHaveTextContent('Locale: en-US');
      });
      expect(container).toHaveTextContent('Messages: Custom title en');
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
      await waitFor(() => {
        expect(container).toHaveTextContent('Locale: en-CA');
      });
      expect(container).toHaveTextContent('Messages: New title en');
    });
  });

  describe('when the locale changes after a successful load', () => {
    let resolveSecondLoad: (messages: TMessageTranslations) => void;
    beforeEach(() => {
      mocked(loadI18n).mockClear();
      mocked(loadI18n).mockImplementation(
        jest.fn((locale: string) => {
          if (locale === 'de') return Promise.resolve({ title: 'Titel de' });
          return new Promise<TMessageTranslations>((resolve) => {
            resolveSecondLoad = resolve;
          });
        })
      );
      props = createTestProps({
        locale: 'de',
        applicationMessages: {
          de: { 'CustomApp.title': 'Custom title de' },
          en: { 'CustomApp.title': 'Custom title en' },
        },
      });
    });

    it('should keep rendering the previously loaded pair until the new one resolves', async () => {
      const { container, rerender } = render(<AsyncLocaleData {...props} />);
      await waitFor(() => {
        expect(container).toHaveTextContent('Locale: de');
      });
      expect(container).toHaveTextContent('Messages: Custom title de');

      rerender(<AsyncLocaleData {...props} locale="en" />);

      // The reported locale must not move ahead of the messages, and a falsy
      // locale here would unmount the authenticated shell.
      expect(container).not.toHaveTextContent('Locale: en');
      expect(container).toHaveTextContent('Locale: de');
      expect(container).toHaveTextContent('Messages: Custom title de');

      await act(async () => {
        resolveSecondLoad({ title: 'Title en' });
      });

      await waitFor(() => {
        expect(container).toHaveTextContent('Locale: en');
      });
      expect(container).toHaveTextContent('Messages: Custom title en');
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
      await waitFor(() => {
        expect(container).toHaveTextContent('Nothing');
      });
    });
  });
});
