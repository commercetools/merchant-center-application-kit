import React from 'react';
import { useIntl } from 'react-intl';
import { Route, Routes, Link } from 'react-router-dom';
import { ListIcon, TableIcon } from '@commercetools-uikit/icons';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import FlatButton from '@commercetools-uikit/flat-button';
import ViewOne from '../view-one';
import ViewTwo from '../view-two';
import messages from './messages';
import styles from './main-view.mod.css';

const MainView = () => {
  const intl = useIntl();

  return (
    <Spacings.Inset scale="m">
      <Spacings.Stack scale="m">
        <Text.Headline as="h1" intlMessage={messages.title} />
        <div className={styles['nav-header']}>
          <Spacings.Inline scale="s">
            <FlatButton
              as={Link}
              to="one"
              icon={<ListIcon />}
              label={intl.formatMessage(messages.labelLinkOne)}
            />
            <FlatButton
              as={Link}
              to="two"
              icon={<TableIcon />}
              label={intl.formatMessage(messages.labelLinkTwo)}
            />
          </Spacings.Inline>
        </div>
        <Routes>
          <Route path="one" component={ViewOne} />
          <Route path="two" component={ViewTwo} />
        </Routes>
      </Spacings.Stack>
    </Spacings.Inset>
  );
};
MainView.displayName = 'MainView';

export default MainView;
