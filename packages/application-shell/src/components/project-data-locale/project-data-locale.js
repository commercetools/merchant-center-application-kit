import React from 'react';
import PropTypes from 'prop-types';
import { deepEqual } from 'fast-equals';
import { localStorage } from '@commercetools-frontend/storage';
import { STORAGE_KEYS } from '../../constants';

const defaultLocale = 'en';

const getSelectedDataLocaleForProject = projectLocales => {
  // In case the project is not present (e.g. 404), we just return `en`
  // as a fallback value but it doesn't really matter at end what the
  // value is. When the user access a proper project, this value will
  // be correctly picked.
  if (!projectLocales) return defaultLocale;
  const cachedDataLocale = localStorage.get(STORAGE_KEYS.SELECTED_DATA_LOCALE);
  // Make sure the cached locale is listed in the selected project
  const isCachedDataLocaleIncludedInProjectLanguages = projectLocales.includes(
    cachedDataLocale
  );
  if (isCachedDataLocaleIncludedInProjectLanguages) return cachedDataLocale;
  // Pick the first locale from the list
  const defaultDataLocaleForProject = projectLocales[0];
  // Cache it
  localStorage.put(
    STORAGE_KEYS.SELECTED_DATA_LOCALE,
    defaultDataLocaleForProject
  );
  return defaultDataLocaleForProject;
};

export default class ProjectDataLocale extends React.PureComponent {
  static displayName = 'ProjectDataLocale';

  static propTypes = {
    locales: PropTypes.arrayOf(PropTypes.string.isRequired),
    children: PropTypes.func.isRequired,
  };

  state = {
    locale: getSelectedDataLocaleForProject(this.props.locales),
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (deepEqual(prevState.locales, nextProps.locales)) return null;

    return {
      locales: nextProps.locales,
      locale: getSelectedDataLocaleForProject(nextProps.locales),
    };
  }

  handleSetProjectDataLocale = locale => {
    this.setState({ locale });
    // Cache it
    localStorage.put(STORAGE_KEYS.SELECTED_DATA_LOCALE, locale);
  };

  render() {
    return this.props.children({
      locale: this.state.locale,
      setProjectDataLocale: this.handleSetProjectDataLocale,
    });
  }
}
