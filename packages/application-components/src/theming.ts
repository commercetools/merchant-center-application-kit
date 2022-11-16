import kebabCase from 'lodash/kebabCase';
import { designTokens as uiKitDesignTokens } from '@commercetools-uikit/design-system';

export const themesOverrides = {
  default: {
    // TODO: To be removed when we update the ui-kit dependency
    colorPrimary: '#00b39e',
    colorSolid: '#1a1a1a',
    colorSurface: '#fff',
    colorForPageHeaderBottomBorder: uiKitDesignTokens.colorNeutral,
    backgroundColorForMainPageDivider: uiKitDesignTokens.colorNeutral60,
    backgroundColorForPageHeader: uiKitDesignTokens.colorNeutral95,
    marginBottomForPageTopBar: uiKitDesignTokens.spacingS,
    marginTopForPageHeaderControls: uiKitDesignTokens.spacingS,
    paddingForPageHeader: `${uiKitDesignTokens.spacingM}`,
    paddingForPageContent: uiKitDesignTokens.spacingM,
  },
  test: {
    // TODO: To be removed when we update the ui-kit dependency
    colorPrimary: '#00b39e',
    colorSolid: '#1a1a1a',
    colorSurface: '#fff',
    colorForPageHeaderBottomBorder: uiKitDesignTokens.colorNeutral90,
    backgroundColorForMainPageDivider: uiKitDesignTokens.colorNeutral90,
    backgroundColorForPageHeader: uiKitDesignTokens.colorSurface,
    marginBottomForPageTopBar: uiKitDesignTokens.spacingL,
    marginTopForPageHeaderControls: uiKitDesignTokens.spacingS,
    // TODO: 40px is to be updated once ui-kit export a new spacing size
    paddingForPageHeader: `${uiKitDesignTokens.spacingXl} 40px`,
    paddingForPageContent: `${uiKitDesignTokens.spacingL} 40px`,
  },
};

export const designTokens = Object.fromEntries(
  Object.keys(themesOverrides.default).map((tokenName) => [
    tokenName,
    `var(--${kebabCase(tokenName)})`,
  ])
);
