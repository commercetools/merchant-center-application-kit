import { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { IntlProvider, useIntl } from 'react-intl';
import { AsyncLocaleData } from '@commercetools-frontend/i18n';
import Card from '@commercetools-uikit/card';
import Constraints from '@commercetools-uikit/constraints';
import DateTimeInput from '@commercetools-uikit/date-time-input';
import Grid from '@commercetools-uikit/grid';
import Label from '@commercetools-uikit/label';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';

import messages from './messages';

const DEMO_LOCALES = [
  'en',
  'en-GB',
  'en-AU',
  'de',
  'de-AT',
  'es',
  'es-MX',
  'fr-FR',
  'pt-BR',
];

const DEMO_TIMEZONE = 'Europe/Berlin';

const DEMO_MONEY_PRICE = {
  currencyCode: 'EUR',
  fractionDigits: 2,
  fractionedAmount: 10362.5,
};

function getSampleDate() {
  const now = new Date();
  now.setFullYear(2022, 8, 30);
  now.setUTCHours(7, 15, 0, 0);
  return now;
}

function formatMoney(moneyValue, intl) {
  return intl.formatNumber(moneyValue.fractionedAmount, {
    style: 'currency',
    currency: moneyValue.currencyCode,
    minimumFractionDigits: moneyValue.fractionDigits,
  });
}

function formatDate(dateString, locale) {
  return moment(dateString).tz(DEMO_TIMEZONE).locale(locale).format('L LT');
}

function ExampleItem({ label, locale, children }) {
  const intl = useIntl();
  const itemId = `${label.id}_${locale}`;

  return (
    <Spacings.Stack>
      <Label isBold id={itemId}>
        {intl.formatMessage(label)}
      </Label>
      <span aria-labelledby={itemId}>{children}</span>
    </Spacings.Stack>
  );
}
ExampleItem.propTypes = {
  label: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

function LocaleExample({ locale, date, timeZone, money }) {
  const intl = useIntl();
  const [exampleDate, setExampleDate] = useState(date);

  return (
    <Card>
      <Spacings.Stack scale="m">
        <ExampleItem label={messages.localeLabel} locale={locale}>
          {locale}
        </ExampleItem>
        <ExampleItem label={messages.fullDateLabel} locale={locale}>
          {formatDate(exampleDate.toISOString(), locale)}
        </ExampleItem>
        <ExampleItem label={messages.dateSelectorLabel} locale={locale}>
          <DateTimeInput
            timeZone={timeZone}
            value={exampleDate.toISOString()}
            onChange={(event) => {
              setExampleDate(new Date(event.target.value));
            }}
          />
        </ExampleItem>
        <ExampleItem label={messages.moneyLabel} locale={locale}>
          {formatMoney(money, intl)}
        </ExampleItem>
      </Spacings.Stack>
    </Card>
  );
}
LocaleExample.propTypes = {
  locale: PropTypes.string.isRequired,
  date: PropTypes.object.isRequired,
  money: PropTypes.object.isRequired,
  timeZone: PropTypes.string.isRequired,
};

export function LocaleExampleWrapper({ locale, date, timeZone, money }) {
  return (
    <div data-testid={`locale-example-${locale}`}>
      <AsyncLocaleData locale={locale} applicationMessages={{}}>
        {({ isLoading, messages }) =>
          !isLoading ? (
            <IntlProvider locale={locale} messages={messages}>
              <LocaleExample
                locale={locale}
                date={date}
                timeZone={timeZone}
                money={money}
              />
            </IntlProvider>
          ) : (
            <span>loading...</span>
          )
        }
      </AsyncLocaleData>
    </div>
  );
}
LocaleExampleWrapper.propTypes = {
  locale: PropTypes.string.isRequired,
  date: PropTypes.object.isRequired,
  money: PropTypes.object.isRequired,
  timeZone: PropTypes.string.isRequired,
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
            <Grid.Item key={locale}>
              <LocaleExampleWrapper
                locale={locale}
                date={getSampleDate()}
                timeZone={DEMO_TIMEZONE}
                money={DEMO_MONEY_PRICE}
              />
            </Grid.Item>
          ))}
        </Grid>
      </Spacings.Stack>
    </Spacings.Inset>
  );
}

export default FormattersDemo;
