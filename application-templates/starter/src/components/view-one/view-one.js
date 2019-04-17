import React from 'react';
import { Text } from '@commercetools-frontend/ui-kit';
import messages from './messages';

const ViewOne = () => <Text.Body intlMessage={messages.title} />;
ViewOne.displayName = 'ViewOne';

export default ViewOne;
