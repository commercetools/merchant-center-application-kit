import { themes, designTokens } from '@commercetools-uikit/design-system';

export type ThemeName = keyof typeof themes;

type ThemeSwitcherProps = {
  selectedTheme: string;
  onThemeChange(theme: ThemeName): void;
};

const ThemeSwitcher = ({
  selectedTheme,
  onThemeChange,
}: ThemeSwitcherProps) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '14px',
        right: '32px',
        padding: `${designTokens.spacingXs} ${designTokens.spacingS}`,
        backgroundColor: designTokens.colorNeutral90,
        border: `1px solid ${designTokens.colorNeutral}`,
      }}
    >
      <label style={{ marginRight: designTokens.spacingS }}>
        Change theme:
      </label>
      <select
        value={selectedTheme}
        onChange={(event) => onThemeChange(event.target.value as ThemeName)}
      >
        <option value="default">Default</option>
        <option value="test">Test</option>
      </select>
    </div>
  );
};

export default ThemeSwitcher;
