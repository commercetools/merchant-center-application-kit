import { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { IntlProvider, useIntl } from 'react-intl';
import Spacings from '@commercetools-uikit/spacings';
import Constraints from '@commercetools-uikit/constraints';
import Text from '@commercetools-uikit/text';
import DateTimeInput from '@commercetools-uikit/date-time-input';
import Grid from '@commercetools-uikit/grid';
import Card from '@commercetools-uikit/card';

import messages from './messages';
import { AsyncLocaleData } from '@commercetools-frontend/i18n';

const DEMO_LOCALES = ['en', 'en-GB', 'en-AU', 'de', 'de-AT', 'es', 'es-MX', 'fr'];

const DEMO_MONEY_PRICE = {
  centAmount: 1036250,
  currencyCode: 'EUR',
  fractionDigits: 2,
  fractionedAmount: 10362.50,
};

function getSampleDate() {
  const now = new Date();
  now.setUTCDate(20);
  now.setUTCSeconds(0);
  now.setUTCMilliseconds(0);
  return now;
}

function formatMoney(moneyValue, intl) {
  return intl.formatNumber(
    moneyValue.fractionedAmount,
    {
      style: 'currency',
      currency: moneyValue.currencyCode,
      minimumFractionDigits: moneyValue.fractionDigits,
    }
  );
}

function formatDate(dateString, locale) {
  return moment(dateString).locale(locale).format('L LT');
}

function ExampleItem({ label, children }) {
  const intl = useIntl();

  return (
    <Spacings.Stack>
      <Text.Body isBold>{intl.formatMessage(label)}:</Text.Body>
      {children}
    </Spacings.Stack>
  );
}
ExampleItem.propTypes = {
  label: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

function LocaleExample({ locale }) {
  const intl = useIntl();
  const [date, setDate] = useState(getSampleDate());

  return (
    <Card>
      <Spacings.Stack scale="m">
        <ExampleItem label={messages.localeLabel}>
          {locale}
        </ExampleItem>
        <ExampleItem label={messages.fullDateLabel}>
          {formatDate(date.toISOString(), locale)}
        </ExampleItem>
        <ExampleItem label={messages.dateSelectorLabel}>
          <DateTimeInput
            timeZone="Europe/Berlin"
            value={date.toISOString()}
            onChange={(event) => {
              setDate(new Date(event.target.value));
            }}
          />
        </ExampleItem>
        <ExampleItem label={messages.moneyLabel}>
          {formatMoney(DEMO_MONEY_PRICE, intl)}
        </ExampleItem>
      </Spacings.Stack>
    </Card>
  );
}
LocaleExample.propTypes = {
  locale: PropTypes.string.isRequired,
};

function LocaleExampleWrapper({ locale }) {
  return (
    <IntlProvider locale={locale}>
      <AsyncLocaleData locale={locale} applicationMessages={{}}>
        {({ isLoading }) => !isLoading ? <LocaleExample locale={locale} /> : null}
      </AsyncLocaleData>
    </IntlProvider>
  );
}
LocaleExampleWrapper.propTypes = {
  locale: PropTypes.string.isRequired,
};

function FormattersDemo() {
  return (
    <Spacings.Inset>
      <Spacings.Stack scale="xl">
        <Spacings.Stack>
          <Constraints.Horizontal max={16}>
            <Text.Headline as="h1" intlMessage={messages.title} />
            <Text.Subheadline as="h4" intlMessage={messages.subtitle} />
          </Constraints.Horizontal>
        </Spacings.Stack>

        <Grid
          gridGap="16px"
          gridAutoColumns="1fr"
          gridTemplateColumns="repeat(3, 1fr)"
        >
          {DEMO_LOCALES.map((locale) => (
            <Grid.Item key={locale}><LocaleExampleWrapper locale={locale} /></Grid.Item>
          ))}
        </Grid>
      </Spacings.Stack>
    </Spacings.Inset>
  );
}

export default FormattersDemo;
