import {
  transformTokensToCssVarsReferences,
  designTokens as uiKitDesignTokens,
} from '@commercetools-uikit/design-system';

const appKitSpacing55 = '40px';
// TODO: move to uikit?
const colorAccent10 = 'hsl(195, 35.2941176471%, 10%)';
const colorAccent20 = 'hsl(195, 35.2941176471%, 20%)';
const colorAccent90 = 'hsl(195, 35.2941176471%, 90%)';
const newShadow1 = '0px 2px 5px 0px rgba(0, 0, 0, 0.15)';

export const themesOverrides = {
  default: {
    colorForPageHeaderBottomBorder: uiKitDesignTokens.colorNeutral90,
    colorForNavbarIcon: colorAccent90,
    colorForNavbarIconWhenActive: uiKitDesignTokens.colorSurface,
    colorForNavbarLink: uiKitDesignTokens.colorNeutral,
    colorForNavbarLinkWhenActive: uiKitDesignTokens.colorSurface,
    colorForNavbarLinkWhenHovered: uiKitDesignTokens.colorSurface,
    backgroundColorForMainPageDivider: uiKitDesignTokens.colorNeutral90,
    backgroundColorForNavbar: colorAccent10,
    backgroundColorForNavbarWhenActive: colorAccent20,
    backgroundColorForNavbarWhenHovered: colorAccent20,
    backgroundColorForPageHeader: uiKitDesignTokens.colorSurface,
    backgroundColorForTabularMainPageContent: uiKitDesignTokens.colorSurface,
    backgroundColorForUserMenuItemWhenHovered: uiKitDesignTokens.colorNeutral95,
    borderBottomForTabularPageHeader: `1px solid ${uiKitDesignTokens.colorNeutral90}`,
    borderColorForDialogDivider: uiKitDesignTokens.colorNeutral90,
    borderColorForModalPageHeaderDivider: uiKitDesignTokens.colorNeutral90,
    borderColorForModalTopBarWhenSurface: uiKitDesignTokens.colorSurface,
    fontSizeForNavbarLink: uiKitDesignTokens.fontSize20,
    fontWeightForNavbarLink: uiKitDesignTokens.fontWeight400,
    fontWeightForNavbarLinkWhenActive: uiKitDesignTokens.fontWeight600,
    fontWeightForNavbarLinkWhenHovered: uiKitDesignTokens.fontWeight600,
    heightForTab: '2px',
    lineHeightForNavbarLink: uiKitDesignTokens.lineHeight20,
    marginBottomForPageTopBar: uiKitDesignTokens.spacing40,
    marginForDialogContainerContents: `${uiKitDesignTokens.spacing30} 0 ${uiKitDesignTokens.spacing50} 0`,
    marginForModalPageHeader: `0 ${appKitSpacing55}`,
    marginForUserMenuItem: `${uiKitDesignTokens.spacing10} 0`,
    marginLeftForModalPageHeaderControls: uiKitDesignTokens.spacing50,
    marginRightForAppbar: appKitSpacing55,
    marginTopForDialogFooter: uiKitDesignTokens.spacing50,
    marginForPageContent: `${uiKitDesignTokens.spacing50} ${appKitSpacing55}`,
    marginTopForPageSubtitle: uiKitDesignTokens.spacing20,
    marginTopForTabControls: uiKitDesignTokens.spacing40,
    paddingForAppbar: `0 ${appKitSpacing55}`,
    paddingForDetailPageHeader: `${uiKitDesignTokens.spacing50} ${appKitSpacing55} ${uiKitDesignTokens.spacing40}`,
    paddingForDialogContainer: `${uiKitDesignTokens.spacing20} ${uiKitDesignTokens.spacing30}`,
    paddingForDialogContent: `${uiKitDesignTokens.spacing40} 0 0`,
    paddingForMainPageHeader: `${uiKitDesignTokens.spacing50} ${appKitSpacing55} 0`,
    paddingForModalPageHeader: `${uiKitDesignTokens.spacing40} 0 ${uiKitDesignTokens.spacing40}`,
    paddingForModalTopBar: `${uiKitDesignTokens.spacing40} ${appKitSpacing55} 0`,
    paddingForTabularPageHeader: `${uiKitDesignTokens.spacing40} ${appKitSpacing55} 0`,
    paddingLeftForTabAsFirst: uiKitDesignTokens.spacing30,
    shadowForAppbar: newShadow1,
    shadowForNavbar: 'none',
    widthForDialogAsMedium: uiKitDesignTokens.constraint9,
    widthForDialogAsLarge: uiKitDesignTokens.constraint13,
    widthForPageLayoutContentColumn: `calc(${uiKitDesignTokens.constraint16} / 2)`,
  },
};

type DesignTokenOverrides = keyof typeof themesOverrides.default;

export const designTokens = transformTokensToCssVarsReferences(
  themesOverrides.default,
  { includeDefaultValue: false }
) as Record<DesignTokenOverrides, string>;
