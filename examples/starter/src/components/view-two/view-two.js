import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Text } from '@commercetools-frontend/ui-kit';
import messages from './messages';

const ViewTwo = () => (
  <Text.Body>
    <FormattedMessage {...messages.title} />
  </Text.Body>
);
ViewTwo.displayName = 'ViewTwo';

export default ViewTwo;
