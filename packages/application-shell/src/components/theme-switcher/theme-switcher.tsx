import { useMemo } from 'react';
import { ThemeProvider } from '@commercetools-uikit/design-system';
import { useFeatureToggle } from '@flopflip/react-broadcast';
import { themesOverrides as appKitThemesOverrides } from '@commercetools-frontend/application-components';
import { UI_REDESIGN } from '../../feature-toggles';

type TThemeOverrides = Record<string, string>;
export type TOverridesPerTheme = Record<string, TThemeOverrides>;

type ThemeSwitcherProps = {
  themesOverrides?: TOverridesPerTheme;
};
const ThemeSwitcher = (props: ThemeSwitcherProps) => {
  const isNewThemeEnabled = useFeatureToggle(UI_REDESIGN);
  const theme = isNewThemeEnabled ? 'test' : 'default';
  const mergedThemeOverrides = useMemo(
    () => ({
      ...appKitThemesOverrides[theme],
      ...props.themesOverrides?.[theme] ?? {},
    }),
    [theme, props.themesOverrides]
  );

  return <ThemeProvider theme={theme} themeOverrides={mergedThemeOverrides} />;
};

export default ThemeSwitcher;
