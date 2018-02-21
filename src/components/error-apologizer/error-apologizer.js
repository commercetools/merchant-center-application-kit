import React from 'react';
import { FormattedMessage } from 'react-intl';
import Text from '@commercetools-local/ui-kit/typography/text';
import ServicePageResponseLayout from '@commercetools-local/core/components/service-page-response-layout';
import messages from './messages';

const ErrorApologizer = () => (
  <ServicePageResponseLayout
    title={<FormattedMessage {...messages.title} />}
    paragraph1={
      <Text.Body>
        <FormattedMessage {...messages.apology} />
      </Text.Body>
    }
  />
);

ErrorApologizer.displayName = 'ErrorApologizer';

export default ErrorApologizer;
