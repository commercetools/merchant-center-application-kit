import {
  render,
  screen,
} from '@commercetools-frontend/application-shell/test-utils';

import { LocaleExampleWrapper } from './formatters-demo';

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
  currencyCode: 'EUR',
  fractionDigits: 2,
  fractionedAmount: 10362.5,
};

describe('Formatters demo', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  it.each`
    locale     | expectedDate            | expectedMoney
    ${'en'}    | ${'07/15/2022 9:15 AM'} | ${'€10,362.50'}
    ${'en-GB'} | ${'15/07/2022 09:15'}   | ${'€10,362.50'}
    ${'en-AU'} | ${'15/07/2022 9:15 AM'} | ${'EUR 10,362.50'}
    ${'de'}    | ${'15.07.2022 09:15'}   | ${'10.362,50 €'}
    ${'de-AT'} | ${'15.07.2022 09:15'}   | ${'€ 10.362,50'}
    ${'es'}    | ${'15/07/2022 9:15'}    | ${'10.362,50 €'}
    ${'es-MX'} | ${'15/07/2022 9:15'}    | ${'EUR 10,362.50'}
    ${'fr-FR'} | ${'15/07/2022 09:15'}   | ${'10 362,50 €'}
  `(
    'should render examples based on different locales (%s)',
    async ({ locale, expectedDate, expectedMoney }) => {
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
        expectedDate
      );
      expect(screen.getByLabelText('Money:')).toHaveTextContent(expectedMoney);
    }
  );
});
