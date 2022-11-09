import kebabCase from 'lodash/kebabCase';
import { designTokens } from '@commercetools-uikit/design-system';

export const themesOverrides = {
  default: {
    paddingForPage: `${designTokens.spacingM} ${designTokens.spacingM}`,
  },
  test: {
    paddingForPage: `${designTokens.spacingXl} 40px`,
  },
};

export const appKitDesignTokens = Object.values(themesOverrides).reduce(
  (appKitTokens, themeTokens) => {
    Object.keys(themeTokens).forEach((tokenName) => {
      if (!appKitTokens[tokenName]) {
        appKitTokens[tokenName] = `var(--${kebabCase(tokenName)})`;
      }
    });
    return appKitTokens;
  },
  {} as Record<string, string>
);
