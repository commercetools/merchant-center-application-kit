import { FormattedMessage } from 'react-intl';
import messages from './messages';

const Channels = () => {
  // ...
  return (
    <Spacings.Stack scale="l">
      <Spacings.Stack scale="s">
        <Text.Headline as="h2">
          <FormattedMessage message={messages.title} />
        </Text.Headline>
      </Spacings.Stack>
      {/* ... */}
    </Spacings.Stack>
  );
};
