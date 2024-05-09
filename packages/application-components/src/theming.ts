import {
  transformTokensToCssVarsReferences,
  designTokens as uiKitDesignTokens,
} from '@commercetools-uikit/design-system';

// We keep these tokens as they are related to page layout components which should have
// a slightly different layout (margins/paddings) when used within a Custom View panel.
// https://github.com/commercetools/merchant-center-application-kit/pull/3353
export const themesOverrides = {
  default: {
    marginForCustomViewsSelectorAsTabular: `0 ${uiKitDesignTokens.spacing55}`,
    marginForPageContent: `${uiKitDesignTokens.spacing50} ${uiKitDesignTokens.spacing55}`,
    paddingForDetailPageHeader: `${uiKitDesignTokens.spacing50} ${uiKitDesignTokens.spacing55} ${uiKitDesignTokens.spacing40}`,
    paddingForMainPageHeader: `${uiKitDesignTokens.spacing50} ${uiKitDesignTokens.spacing55} 0`,
    paddingForTabularPageHeader: `${uiKitDesignTokens.spacing40} ${uiKitDesignTokens.spacing55} 0`,
    backgroundColorForNavbar: uiKitDesignTokens.colorPrimary10,
    backgroundColorForNavbarHeader: uiKitDesignTokens.colorPrimary10,
    fontColorForTabLabelWhenActive: uiKitDesignTokens.colorPrimary,
  },
};

type DesignTokenOverrides = keyof typeof themesOverrides.default;

export const designTokens = transformTokensToCssVarsReferences(
  themesOverrides.default,
  { includeDefaultValue: false }
) as Record<DesignTokenOverrides, string>;
