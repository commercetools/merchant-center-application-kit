import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';
import es from 'react-intl/locale-data/es';

addLocaleData(en);
addLocaleData(de);
addLocaleData(es);

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
