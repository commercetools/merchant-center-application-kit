import React from 'react';
import { STORAGE_KEYS } from '../../constants';

type RenderFnArgs = {
  locale: string;
  setProjectDataLocale: (locale: string) => void;
};
type Props = {
  locales: string[];
  children: (args: RenderFnArgs) => React.ReactNode;
};

const defaultLocale = 'en';

const getSelectedDataLocaleForProject = (projectLocales?: string[]) => {
  // In case the project is not present (e.g. 404), we just return `en`
  // as a fallback value but it doesn't really matter at end what the
  // value is. When the user access a proper project, this value will
  // be correctly picked.
  if (!projectLocales) return defaultLocale;
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

const ProjectDataLocale = (props: Props) => {
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

export default ProjectDataLocale;
