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
    // recolouring rollout
    backgroundColorForNavbar: uiKitDesignTokens.colorPrimary,
    backgroundColorForNavbarExpander: `linear-gradient(180deg, ${uiKitDesignTokens.colorPrimary} 0%, ${uiKitDesignTokens.colorPrimary25} 100%)`,
    backgroundColorForNavbarExpanderWhenHovered:
      uiKitDesignTokens.colorPrimary40,
    backgroundColorForNavbarHeader: uiKitDesignTokens.colorAccent10,
    backgroundColorForNavbarMenuItemWhenActive: uiKitDesignTokens.colorAccent30,
    backgroundColorForNavbarMenuItemWhenHovered:
      uiKitDesignTokens.colorPrimary40,
    backgroundColorForNavbarSkeleton: '#009987',
    backgroundColorForNavbarSkeletonFooter:
      'linear-gradient(180deg, #009987 0%, #004d44 100%)',
    borderColorForNotificationWhenSuccess: uiKitDesignTokens.colorPrimary85,
    fontColorForNotificationWhenSuccess: uiKitDesignTokens.colorPrimary,
    fontColorForNotificationWhenWarning: uiKitDesignTokens.colorWarning,
    fontColorForTabLabelWhenActive: uiKitDesignTokens.colorSolid,
    visibilityForNavbarFaded: 'visible',
  },
  recolouring: {
    marginForCustomViewsSelectorAsTabular: `0 ${uiKitDesignTokens.spacing55}`,
    marginForPageContent: `${uiKitDesignTokens.spacing50} ${uiKitDesignTokens.spacing55}`,
    paddingForDetailPageHeader: `${uiKitDesignTokens.spacing50} ${uiKitDesignTokens.spacing55} ${uiKitDesignTokens.spacing40}`,
    paddingForMainPageHeader: `${uiKitDesignTokens.spacing50} ${uiKitDesignTokens.spacing55} 0`,
    paddingForTabularPageHeader: `${uiKitDesignTokens.spacing40} ${uiKitDesignTokens.spacing55} 0`,
    backgroundColorForNavbar: uiKitDesignTokens.colorPrimary10,
    backgroundColorForNavbarExpander: uiKitDesignTokens.colorPrimary10,
    backgroundColorForNavbarExpanderWhenHovered:
      uiKitDesignTokens.colorPrimary10,
    backgroundColorForNavbarHeader: uiKitDesignTokens.colorPrimary10,
    backgroundColorForNavbarMenuItemWhenActive:
      uiKitDesignTokens.colorPrimary25,
    backgroundColorForNavbarMenuItemWhenHovered:
      uiKitDesignTokens.colorPrimary20,
    backgroundColorForNavbarSkeleton: uiKitDesignTokens.colorPrimary10,
    backgroundColorForNavbarSkeletonFooter: uiKitDesignTokens.colorPrimary10,
    borderColorForNotificationWhenSuccess: uiKitDesignTokens.colorSuccess85,
    fontColorForNotificationWhenSuccess: uiKitDesignTokens.colorSuccess,
    fontColorForNotificationWhenWarning: uiKitDesignTokens.colorWarning60,
    fontColorForTabLabelWhenActive: uiKitDesignTokens.colorPrimary,
    visibilityForNavbarFaded: 'hidden',
  },
};

type DesignTokenOverrides = keyof typeof themesOverrides.default;

export const designTokens = transformTokensToCssVarsReferences(
  themesOverrides.default,
  { includeDefaultValue: false }
) as Record<DesignTokenOverrides, string>;
