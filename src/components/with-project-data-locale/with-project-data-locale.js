import React from 'react';
import PropTypes from 'prop-types';
import { STORAGE_KEYS as CORE_STORAGE_KEYS } from '@commercetools-local/constants';
import * as storage from '@commercetools-local/utils/storage';

const defaultLocale = 'en';

const getSelectedDataLocaleForProject = projectLanguages => {
  // In case the project is not present (e.g. 404), we just return `en`
  // as a fallback value but it doesn't really matter at end what the
  // value is. When the user access a proper project, this value will
  // be correctly picked.
  if (!projectLanguages) return defaultLocale;
  const cachedLanguage = storage.get(CORE_STORAGE_KEYS.SELECTED_DATA_LOCALE);
  // Make sure the cached language is listed in the selected project
  const isCachedLanguageIncludedInProjectLanguages = projectLanguages.includes(
    cachedLanguage
  );
  if (isCachedLanguageIncludedInProjectLanguages) return cachedLanguage;
  const defaultProjectLanguage = projectLanguages[0];
  storage.put(CORE_STORAGE_KEYS.SELECTED_DATA_LOCALE, defaultProjectLanguage);
  return defaultProjectLanguage;
};

export default class WithProjectDataLocale extends React.PureComponent {
  static displayName = 'WithProjectDataLocale';

  static propTypes = {
    locales: PropTypes.arrayOf(PropTypes.string.isRequired),
    children: PropTypes.func.isRequired,
  };

  state = {
    locale: getSelectedDataLocaleForProject(),
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.locales && nextProps.locales)
      this.setState({
        locale: getSelectedDataLocaleForProject(nextProps.locales),
      });
  }

  handleSetProjectDataLocale = locale => {
    this.setState({ locale });
  };

  render() {
    return this.props.children({
      locale: this.state.locale,
      setProjectDataLocale: this.handleSetProjectDataLocale,
    });
  }
}
