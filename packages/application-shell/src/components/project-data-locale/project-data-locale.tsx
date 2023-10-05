import { ReactNode, useCallback, useState } from 'react';
import { STORAGE_KEYS } from '@commercetools-frontend/constants';

type RenderFnArgs = {
  locale: string;
  setProjectDataLocale: (locale: string) => void;
};
type Props = {
  locales: string[];
  children: (args: RenderFnArgs) => ReactNode;
};

const getSelectedDataLocaleForProject = (projectLocales: Props['locales']) => {
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
  const [locale, setLocale] = useState(
    getSelectedDataLocaleForProject(props.locales)
  );
  const handleSetProjectDataLocale = useCallback((locale) => {
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
