import kebabCase from 'lodash/kebabCase';
import { designTokens as uiKitDesignTokens } from '@commercetools-uikit/design-system';

export const themesOverrides = {
  default: {
    // TODO: To be removed when we update the ui-kit dependency
    colorPrimary: '#00b39e',
    colorSolid: '#1a1a1a',
    colorSurface: '#fff',
    backgroundColorForPageHeader: uiKitDesignTokens.colorNeutral95,
    paddingForPage: `${uiKitDesignTokens.spacingM} ${uiKitDesignTokens.spacingM}`,
  },
  test: {
    // TODO: To be removed when we update the ui-kit dependency
    colorPrimary: '#00b39e',
    colorSolid: '#1a1a1a',
    colorSurface: '#fff',
    backgroundColorForPageHeader: uiKitDesignTokens.colorSurface,
    // TODO: 40px is to be updated once ui-kit export a new spacing size
    paddingForPage: `${uiKitDesignTokens.spacingXl} 40px`,
  },
};

export const designTokens = Object.fromEntries(
  Object.keys(themesOverrides.default).map((tokenName) => [
    tokenName,
    `var(--${kebabCase(tokenName)})`,
  ])
);
