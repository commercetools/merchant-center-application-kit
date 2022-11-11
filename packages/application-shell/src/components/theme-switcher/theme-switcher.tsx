import { ThemeProvider } from '@commercetools-uikit/design-system';
import { useFeatureToggle } from '@flopflip/react-broadcast';
import { UI_REDESIGN } from '../../feature-toggles';

const ThemeSwitcher = () => {
  const isNewThemeEnabled = useFeatureToggle(UI_REDESIGN);
  return <ThemeProvider theme={isNewThemeEnabled ? 'test' : 'default'} />;
};

export default ThemeSwitcher;
