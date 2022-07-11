import moment from 'moment';
import {
  ENTRY_POINT_APP_KIT_PLAYGROUND,
  URL_APP_KIT_PLAYGROUND_DATES_FORMATTERS,
} from '../../support/urls';

const DEMO_LOCALES = [
  'en',
  'en-GB',
  'en-AU',
  'de',
  'de-AT',
  'es',
  'es-MX',
  'fr',
];

function getSampleDate() {
  const now = new Date();
  now.setUTCDate(20);
  now.setUTCSeconds(0);
  now.setUTCMilliseconds(0);
  return now;
}

function formatDate(dateString, locale) {
  return moment(dateString).locale(locale).format('L LT');
}

describe('Dates formatter', () => {
  beforeEach(() => {
    cy.loginByOidc({
      entryPointUriPath: ENTRY_POINT_APP_KIT_PLAYGROUND,
      initialRoute: URL_APP_KIT_PLAYGROUND_DATES_FORMATTERS,
    });
  });

  it('should display different locale formats', () => {
    const sampleDate = getSampleDate();

    for (const locale of DEMO_LOCALES) {
      cy.findByTestId('locale-example-en').should('exist');
      cy.findByTestId(`locale-example-${locale}`).within(() => {
        cy.findByText(formatDate(sampleDate, locale)).should('exist');
      });
    }

    cy.percySnapshot();
  });
});