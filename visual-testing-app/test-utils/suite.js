import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

const Suite = props => (
  <IntlProvider locale={props.locale}>
    <div>{props.children}</div>
  </IntlProvider>
);

Suite.defualtProps = {
  locale: 'en',
};

Suite.propTypes = {
  children: PropTypes.node.isRequired,
  locale: PropTypes.string,
};

Suite.displayName = 'Suite';

export default Suite;
