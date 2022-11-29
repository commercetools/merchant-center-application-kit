import {
  transformTokensToCssVarsReferences,
  designTokens as uiKitDesignTokens,
} from '@commercetools-uikit/design-system';

const appKitSpacing55 = '40px';
// TODO: move to uikit?
const colorAccent10 = 'hsl(195, 35.2941176471%, 10%)';
const colorAccent90 = 'hsl(195, 35.2941176471%, 90%)';
const newShadow1 = '0px 2px 5px 0px rgba(0, 0, 0, 0.15)';

export const themesOverrides = {
  default: {
    colorForPageHeaderBottomBorder: uiKitDesignTokens.colorNeutral,
    colorForNavbarIcon: uiKitDesignTokens.colorSurface,
    colorForNavbarIconWhenActive: uiKitDesignTokens.colorPrimary,
    colorForNavbarLink: uiKitDesignTokens.colorSurface,
    colorForNavbarLinkWhenActive: uiKitDesignTokens.colorPrimary,
    backgroundColorForMainPageDivider: uiKitDesignTokens.colorNeutral60,
    backgroundColorForNavbar: uiKitDesignTokens.colorAccent,
    backgroundColorForPageHeader: uiKitDesignTokens.colorNeutral95,
    backgroundColorForTabularMainPageContent: uiKitDesignTokens.colorNeutral95,
    backgroundColorForUserMenuItemWhenHovered: uiKitDesignTokens.colorNeutral90,
    borderBottomForTabularPageHeader: `1px solid ${uiKitDesignTokens.colorNeutral}`,
    borderColorForDialogDivider: uiKitDesignTokens.colorNeutral,
    borderColorForModalPageHeaderDivider: uiKitDesignTokens.colorNeutral60,
    borderColorForModalTopBarWhenSurface: uiKitDesignTokens.colorNeutral,
    fontSizeForNavbarLink: uiKitDesignTokens.fontSize40,
    heightForTab: '4px',
    lineHeightForNavBarLink: uiKitDesignTokens.lineHeight50,
    marginBottomForPageTopBar: uiKitDesignTokens.spacing20,
    marginForDialogContainerContents: `${uiKitDesignTokens.spacing30} 0`,
    marginForModalPageHeader: `0 ${uiKitDesignTokens.spacing30}`,
    marginForUserMenuItem: '0',
    marginLeftForModalPageHeaderControls: uiKitDesignTokens.spacing30,
    marginRightForAppbar: uiKitDesignTokens.spacing30,
    marginTopForDialogFooter: uiKitDesignTokens.spacing30,
    marginTopForPageSubtitle: uiKitDesignTokens.spacing30,
    marginTopForTabControls: uiKitDesignTokens.spacing20,
    paddingForDetailPageHeader: uiKitDesignTokens.spacing30,
    paddingForDialogContainer: `0`,
    paddingForDialogContent: `${uiKitDesignTokens.spacing30} 0 ${uiKitDesignTokens.spacing20}`,
    paddingForMainPageHeader: uiKitDesignTokens.spacing30,
    paddingForModalPageHeader: `${uiKitDesignTokens.spacing30} 0`,
    paddingForModalTopBar: `${uiKitDesignTokens.spacing20} ${uiKitDesignTokens.spacing30}`,
    paddingForPageContent: uiKitDesignTokens.spacing30,
    paddingForTabularPageHeader: `${uiKitDesignTokens.spacing30} ${uiKitDesignTokens.spacing30} 0`,
    paddingLeftForTabAsFirst: '0',
    shadowForAppbar: uiKitDesignTokens.shadow1,
    widthForDialogAsMedium: uiKitDesignTokens.constraint7,
    widthForDialogAsLarge: uiKitDesignTokens.constraint10,
    widthForPageLayoutContentColumn: `calc(${uiKitDesignTokens.constraint15} / 2)`,
  },
  test: {
    colorForPageHeaderBottomBorder: uiKitDesignTokens.colorNeutral90,
    // TODO: final color not defined yet.
    colorForNavbarIcon: colorAccent90,
    // TODO: final color not defined yet.
    colorForNavbarIconWhenActive: uiKitDesignTokens.colorSurface,
    // TODO: final color not defined yet.
    colorForNavbarLink: colorAccent90,
    // TODO: final color not defined yet.
    colorForNavbarLinkWhenActive: uiKitDesignTokens.colorSurface,
    backgroundColorForMainPageDivider: uiKitDesignTokens.colorNeutral90,
    // TODO: final color not defined yet.
    backgroundColorForNavbar: colorAccent10,
    backgroundColorForPageHeader: uiKitDesignTokens.colorSurface,
    backgroundColorForTabularMainPageContent: uiKitDesignTokens.colorSurface,
    backgroundColorForUserMenuItemWhenHovered: uiKitDesignTokens.colorNeutral95,
    borderBottomForTabularPageHeader: `1px solid ${uiKitDesignTokens.colorNeutral90}`,
    borderColorForDialogDivider: uiKitDesignTokens.colorNeutral90,
    borderColorForModalPageHeaderDivider: uiKitDesignTokens.colorNeutral90,
    borderColorForModalTopBarWhenSurface: uiKitDesignTokens.colorSurface,
    fontSizeForNavbarLink: uiKitDesignTokens.fontSize20,
    heightForTab: '2px',
    lineHeightForNavBarLink: uiKitDesignTokens.lineHeight20,
    marginBottomForPageTopBar: uiKitDesignTokens.spacing40,
    marginForDialogContainerContents: `${uiKitDesignTokens.spacing30} 0 ${uiKitDesignTokens.spacing50} 0`,
    marginForModalPageHeader: `0 ${appKitSpacing55}`,
    marginForUserMenuItem: `${uiKitDesignTokens.spacing10} 0`,
    marginLeftForModalPageHeaderControls: uiKitDesignTokens.spacing50,
    marginRightForAppbar: appKitSpacing55,
    marginTopForDialogFooter: uiKitDesignTokens.spacing50,
    marginTopForPageSubtitle: uiKitDesignTokens.spacing20,
    marginTopForTabControls: uiKitDesignTokens.spacing40,
    paddingForDetailPageHeader: `${uiKitDesignTokens.spacing50} ${appKitSpacing55} ${uiKitDesignTokens.spacing40}`,
    paddingForDialogContainer: `${uiKitDesignTokens.spacing20} ${uiKitDesignTokens.spacing30}`,
    paddingForDialogContent: `${uiKitDesignTokens.spacing40} 0 0`,
    paddingForMainPageHeader: `${uiKitDesignTokens.spacing50} ${appKitSpacing55} 0`,
    paddingForModalPageHeader: `${uiKitDesignTokens.spacing40} 0 ${uiKitDesignTokens.spacing40}`,
    paddingForModalTopBar: `${uiKitDesignTokens.spacing40} ${appKitSpacing55} 0`,
    paddingForPageContent: `${uiKitDesignTokens.spacing50} ${appKitSpacing55}`,
    paddingForTabularPageHeader: `${uiKitDesignTokens.spacing40} ${appKitSpacing55} 0`,
    paddingLeftForTabAsFirst: uiKitDesignTokens.spacing30,
    shadowForAppbar: newShadow1,
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
