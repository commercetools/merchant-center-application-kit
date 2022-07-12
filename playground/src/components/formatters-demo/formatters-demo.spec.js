import {
  render,
  screen,
} from '@commercetools-frontend/application-shell/test-utils';

import { LocaleExampleWrapper, DEMO_LOCALES } from './formatters-demo';

// Mock moment locale metadata file imports
jest.mock('moment/dist/locale/en-gb', () => {});
jest.mock('moment/dist/locale/en-au', () => {});
jest.mock('moment/dist/locale/de', () => {});
jest.mock('moment/dist/locale/de-at', () => {});
jest.mock('moment/dist/locale/es', () => {});
jest.mock('moment/dist/locale/es-mx', () => {});
jest.mock('moment/dist/locale/fr', () => {});

const demoDate = new Date('2022-07-15T07:15:22.000Z');
const demoTimeZone = 'Europe/Berlin';
const demoMoney = {
  centAmount: 1036250,
  currencyCode: 'EUR',
  fractionDigits: 2,
  fractionedAmount: 10362.5,
};

const expectedFormatResults = {
  en: {
    date: '07/15/2022 9:15 AM',
    money: '€10,362.50',
  },
  'en-GB': {
    date: '15/07/2022 09:15',
    money: '€10,362.50',
  },
  'en-AU': {
    date: '15/07/2022 9:15 AM',
    money: 'EUR 10,362.50',
  },
  de: {
    date: '15.07.2022 09:15',
    money: '10.362,50 €',
  },
  'de-AT': {
    date: '15.07.2022 09:15',
    money: '€ 10.362,50',
  },
  es: {
    date: '15/07/2022 9:15',
    money: '10.362,50 €',
  },
  'es-MX': {
    date: '15/07/2022 9:15',
    money: 'EUR 10,362.50',
  },
  'fr-FR': {
    date: '15/07/2022 09:15',
    money: '10 362,50 €',
  },
};

describe('Formatters demo', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  it.each(DEMO_LOCALES)(
    'should render examples based on different locales (%s)',
    async (locale) => {
      render(
        <LocaleExampleWrapper
          locale={locale}
          date={demoDate}
          timeZone={demoTimeZone}
          money={demoMoney}
        />
      );

      // Wait for the locale to be loaded
      await screen.findByLabelText('Current locale:');

      // Validate date and money rendered format
      expect(screen.getByLabelText('Full date:')).toHaveTextContent(
        expectedFormatResults[locale].date
      );
      expect(screen.getByLabelText('Money:')).toHaveTextContent(
        expectedFormatResults[locale].money
      );
    }
  );
});
