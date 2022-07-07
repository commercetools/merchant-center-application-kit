import { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useIntl } from 'react-intl';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import Spacings from '@commercetools-uikit/spacings';
import Constraints from '@commercetools-uikit/constraints';
import Text from '@commercetools-uikit/text';
import DateTimeInput from '@commercetools-uikit/date-time-input';
import Link from '@commercetools-uikit/link';

import messages from './messages';

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

const getProfileLink = (msg) => (
  <Link
    // key="sso-docs-url"
    to="https://mc.europe-west1.gcp.escemo.com/account/profile"
    isExternal
  >
    {msg}
  </Link>
);

function Example({ label, children }) {
  const intl = useIntl();
  return (
    <Spacings.Stack>
      <Text.Body isBold>{intl.formatMessage(label)}:</Text.Body>
      {children}
    </Spacings.Stack>
  );
}
Example.propTypes = {
  label: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

function FormattersDemo() {
  const intl = useIntl();
  const appLocale = useApplicationContext(context => context.user.locale);
  const [date, setDate] = useState(getSampleDate());

  return (
    <Spacings.Inset>
      <Spacings.Stack scale="xl">
        <Spacings.Stack>
          <Constraints.Horizontal max={16}>
            <Text.Headline as="h1" intlMessage={messages.title} />
            <Text.Subheadline as="h4" intlMessage={{...messages.subtitle, values: { profileLink: getProfileLink }}} />
          </Constraints.Horizontal>
        </Spacings.Stack>
        <Constraints.Horizontal max={6}>
          <Spacings.Stack scale="m">
            <Example label={messages.localeLabel}>
              {appLocale}
            </Example>
            <Example label={messages.fullDateLabel}>
              {formatDate(date.toISOString(), 'en')}
            </Example>
            <Example label={messages.dateSelectorLabel}>
              <DateTimeInput
                timeZone="Europe/Berlin"
                value={date.toISOString()}
                onChange={(event) => {
                  console.log({ event });
                  setDate(new Date(event.target.value));
                }}
              />
            </Example>
            <Example label={messages.moneyLabel}>
              {formatMoney(DEMO_MONEY_PRICE, intl)}
            </Example>
          </Spacings.Stack>
        </Constraints.Horizontal>
      </Spacings.Stack>
    </Spacings.Inset>
  );
}

export default FormattersDemo;
