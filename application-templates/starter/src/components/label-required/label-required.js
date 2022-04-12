import { defineMessages, FormattedMessage } from 'react-intl';
import RequiredIndicator from '../required-indicator';

const messages = defineMessages({
  title: {
    id: 'LabelRequired.title',
    description:
      'The title of the label, used for displaying message ' +
      'for required fields',
    defaultMessage: 'Mandatory fields are marked with an asterisk ({star}).',
  },
});

const LabelRequired = () => (
  <FormattedMessage
    {...messages.title}
    values={{
      star: <RequiredIndicator />,
    }}
  />
);

LabelRequired.displayName = 'LabelRequired';

export default LabelRequired;
