import { useIntl } from 'react-intl';

const Button = () => {
  const intl = useIntl();
  return (
    <FlatButton
      label={intl.formatMessage(messages.save)}
      // ...
    />
  );
};
