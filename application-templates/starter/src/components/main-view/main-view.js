import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Route, Switch, Link } from 'react-router-dom';
import { ListIcon, TableIcon } from '@commercetools-uikit/icons';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import FlatButton from '@commercetools-uikit/flat-button';
import ViewOne from '../view-one';
import ViewTwo from '../view-two';
import messages from './messages';
import styles from './main-view.mod.css';

const MainView = (props) => {
  const intl = useIntl();

  return (
    <Spacings.Inset scale="m">
      <Spacings.Stack scale="m">
        <Text.Headline as="h1" intlMessage={messages.title} />
        <div className={styles['nav-header']}>
          <Spacings.Inline scale="s">
            <FlatButton
              as={Link}
              to={`${props.match.url}/one`}
              icon={<ListIcon />}
              label={intl.formatMessage(messages.labelLinkOne)}
            />
            <FlatButton
              as={Link}
              to={`${props.match.url}/two`}
              icon={<TableIcon />}
              label={intl.formatMessage(messages.labelLinkTwo)}
            />
          </Spacings.Inline>
        </div>
        <Switch>
          <Route path={`${props.match.path}/one`} component={ViewOne} />
          <Route path={`${props.match.path}/two`} component={ViewTwo} />
        </Switch>
      </Spacings.Stack>
    </Spacings.Inset>
  );
};
MainView.displayName = 'MainView';
MainView.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      projectKey: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MainView;
