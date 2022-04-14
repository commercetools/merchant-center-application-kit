import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import {
  PageNotFound,
  InfoModalPage,
} from '@commercetools-frontend/application-components';
import { DOMAINS } from '@commercetools-frontend/constants';
import { Notifier } from '@commercetools-frontend/react-notifications';
import { useChannelDetailsFetcher } from '../../hooks/use-channel-details-connector';
import ChannelDetailsUpdate from './channel-details-update';
import messages from './messages';

const ChannelDetails = (props) => {
  const intl = useIntl();
  const params = useParams();
  const { loading, error, channel } = useChannelDetailsFetcher(params.id);

  if (error) {
    return (
      <Notifier
        kind="error"
        domain={DOMAINS.PAGE}
        text={intl.formatMessage(messages.channelDetailsErrorMessage)}
      />
    );
  }
  if (!loading && !channel)
    return (
      <InfoModalPage
        isOpen={true}
        title={intl.formatMessage(messages.modalTitle)}
        onClose={props.onClose}
      >
        <PageNotFound />
      </InfoModalPage>
    );
  return channel ? (
    <ChannelDetailsUpdate onClose={props.onClose} channel={channel} />
  ) : null;
};
ChannelDetails.displayName = 'ChannelDetails';
ChannelDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ChannelDetails;
