import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Text } from '@commercetools-frontend/ui-kit';
import messages from './messages';

const ViewOne = () => (
  <Text.Body>
    <FormattedMessage {...messages.title} />
  </Text.Body>
);
ViewOne.displayName = 'ViewOne';

export default ViewOne;
