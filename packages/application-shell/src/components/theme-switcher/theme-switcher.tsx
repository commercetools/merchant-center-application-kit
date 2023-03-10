import { useFeatureToggle } from '@flopflip/react-broadcast';
import { themesOverrides } from '@commercetools-frontend/application-components';
import { ThemeProvider } from '@commercetools-uikit/design-system';
import { UI_REDESIGN } from '../../feature-toggles';

const ThemeSwitcher = () => {
  const isNewThemeEnabled = useFeatureToggle(UI_REDESIGN);
  const theme = isNewThemeEnabled ? 'test' : 'default';
  return (
    <ThemeProvider theme={theme} themeOverrides={themesOverrides[theme]} />
  );
};

export default ThemeSwitcher;
