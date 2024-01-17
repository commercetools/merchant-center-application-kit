import { designTokens as uiKitDesignTokens } from '@commercetools-uikit/design-system';

// These styles exist so we can make the Page Layout components to work
// property when they are used within a Custom View panel.
// Those components have some default margins and paddings around them
// which are required when using this components in Custom Applications,
// but we don't want them in Custom View panels since they already provide
// their own paddings.
// These overrides allows us to change the border/margins those Page Layout
// components use when they are used within a Custom View panel.
export const customViewsThemesOverrides = {
  default: {
    marginForCustomViewsSelectorAsTabular: '0',
    marginForPageContent: `${uiKitDesignTokens.spacing50} 0`,
    paddingForDetailPageHeader: `0 0 ${uiKitDesignTokens.spacing40} 0`,
    paddingForMainPageHeader: '0',
    paddingForModalPageHeader: `0 0 ${uiKitDesignTokens.spacing40} 0`,
    paddingForTabularPageHeader: '0',
  },
};
