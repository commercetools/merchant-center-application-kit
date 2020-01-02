import React from 'react';
import PropTypes from 'prop-types';
import { STORAGE_KEYS } from '../../constants';

const getSelectedDataLocaleForProject = projectLocales => {
  const cachedDataLocale = window.localStorage.getItem(
    STORAGE_KEYS.SELECTED_DATA_LOCALE
  );
  // Make sure the cached locale is listed in the selected project
  const isCachedDataLocaleIncludedInProjectLanguages = projectLocales.includes(
    cachedDataLocale || ''
  );
  if (cachedDataLocale && isCachedDataLocaleIncludedInProjectLanguages)
    return cachedDataLocale;
  // Pick the first locale from the list
  const defaultDataLocaleForProject = projectLocales[0];
  // Cache it
  window.localStorage.setItem(
    STORAGE_KEYS.SELECTED_DATA_LOCALE,
    defaultDataLocaleForProject
  );
  return defaultDataLocaleForProject;
};

const ProjectDataLocale = props => {
  const [locale, setLocale] = React.useState(
    getSelectedDataLocaleForProject(props.locales)
  );
  const handleSetProjectDataLocale = React.useCallback(locale => {
    setLocale(locale);
    // Cache it
    window.localStorage.setItem(STORAGE_KEYS.SELECTED_DATA_LOCALE, locale);
  }, []);
  return (
    <>
      {props.children({
        locale,
        setProjectDataLocale: handleSetProjectDataLocale,
      })}
    </>
  );
};
ProjectDataLocale.displayName = 'ProjectDataLocale';
ProjectDataLocale.propTypes = {
  locales: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.func.isRequired,
};

export default ProjectDataLocale;
