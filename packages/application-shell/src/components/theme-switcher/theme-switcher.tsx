import { useFeatureToggle } from '@flopflip/react-broadcast';
import { themesOverrides } from '@commercetools-frontend/application-components';
import { featureFlags } from '@commercetools-frontend/constants';
import { ThemeProvider } from '@commercetools-uikit/design-system';

const ThemeSwitcher = () => {
  const isRecolouringThemeEnabled = useFeatureToggle(featureFlags.RECOLOURING);
  const theme = isRecolouringThemeEnabled ? 'recolouring' : 'default';
  return (
    <>
      <ThemeProvider theme={theme} themeOverrides={themesOverrides[theme]} />
    </>
  );
};

export default ThemeSwitcher;
