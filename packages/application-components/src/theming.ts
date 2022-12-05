import {
  transformTokensToCssVarsReferences,
  designTokens as uiKitDesignTokens,
} from '@commercetools-uikit/design-system';

const appKitSpacing55 = '40px';

export const themesOverrides = {
  default: {
    colorForPageHeaderBottomBorder: uiKitDesignTokens.colorNeutral,
    backgroundColorForMainPageDivider: uiKitDesignTokens.colorNeutral60,
    backgroundColorForPageHeader: uiKitDesignTokens.colorNeutral95,
    backgroundColorForTabularMainPageContent: uiKitDesignTokens.colorNeutral95,
    borderBottomForTabularPageHeader: `1px solid ${uiKitDesignTokens.colorNeutral}`,
    borderColorForDialogDivider: uiKitDesignTokens.colorNeutral,
    borderColorForModalPageHeaderDivider: uiKitDesignTokens.colorNeutral60,
    borderColorForModalTopBarWhenSurface: uiKitDesignTokens.colorNeutral,
    fontSizeForNavBarLink: uiKitDesignTokens.fontSize40,
    heightForTab: '4px',
    lineHeightForNavBarLink: uiKitDesignTokens.lineHeight50,
    marginBottomForPageTopBar: uiKitDesignTokens.spacing20,
    marginForDialogContainerContents: `${uiKitDesignTokens.spacing30} 0`,
    marginForModalPageHeader: `0 ${uiKitDesignTokens.spacing30}`,
    marginLeftForModalPageHeaderControls: uiKitDesignTokens.spacing30,
    marginTopForDialogFooter: uiKitDesignTokens.spacing40,
    marginTopForPageSubtitle: uiKitDesignTokens.spacing30,
    marginTopForTabControls: uiKitDesignTokens.spacing20,
    paddingForDetailPageHeader: uiKitDesignTokens.spacing30,
    paddingForDialogContainer: '0',
    paddingForDialogContent: `${uiKitDesignTokens.spacing30} 0 0`,
    paddingForMainPageHeader: uiKitDesignTokens.spacing30,
    paddingForModalPageHeader: `${uiKitDesignTokens.spacing30} 0`,
    paddingForModalTopBar: `${uiKitDesignTokens.spacing20} ${uiKitDesignTokens.spacing30}`,
    paddingForPageContent: uiKitDesignTokens.spacing30,
    paddingForTabularPageHeader: `${uiKitDesignTokens.spacing30} ${uiKitDesignTokens.spacing30} 0`,
    paddingLeftForTabAsFirst: '0',
    widthForDialogAsMedium: uiKitDesignTokens.constraint7,
    widthForDialogAsLarge: uiKitDesignTokens.constraint10,
    widthForPageLayoutContentColumn: `calc(${uiKitDesignTokens.constraint15} / 2)`,
  },
  test: {
    colorForPageHeaderBottomBorder: uiKitDesignTokens.colorNeutral90,
    backgroundColorForMainPageDivider: uiKitDesignTokens.colorNeutral90,
    backgroundColorForPageHeader: uiKitDesignTokens.colorSurface,
    backgroundColorForTabularMainPageContent: uiKitDesignTokens.colorSurface,
    borderBottomForTabularPageHeader: `1px solid ${uiKitDesignTokens.colorNeutral90}`,
    borderColorForDialogDivider: uiKitDesignTokens.colorNeutral90,
    borderColorForModalPageHeaderDivider: uiKitDesignTokens.colorNeutral90,
    borderColorForModalTopBarWhenSurface: uiKitDesignTokens.colorSurface,
    fontSizeForNavBarLink: uiKitDesignTokens.fontSize20,
    heightForTab: '2px',
    lineHeightForNavBarLink: uiKitDesignTokens.lineHeight20,
    marginBottomForPageTopBar: uiKitDesignTokens.spacing40,
    marginForDialogContainerContents: `${uiKitDesignTokens.spacing30} 0 ${uiKitDesignTokens.spacing50} 0`,
    marginForModalPageHeader: `0 ${appKitSpacing55}`,
    marginLeftForModalPageHeaderControls: uiKitDesignTokens.spacing50,
    marginTopForDialogFooter: uiKitDesignTokens.spacing50,
    marginTopForPageSubtitle: uiKitDesignTokens.spacing20,
    marginTopForTabControls: uiKitDesignTokens.spacing40,
    paddingForDetailPageHeader: `${uiKitDesignTokens.spacing50} ${appKitSpacing55} ${uiKitDesignTokens.spacing40}`,
    paddingForDialogContainer: `${uiKitDesignTokens.spacing20} ${uiKitDesignTokens.spacing30}`,
    paddingForDialogContent: `${uiKitDesignTokens.spacing40} 0 0`,
    paddingForMainPageHeader: `${uiKitDesignTokens.spacing50} ${appKitSpacing55} 0`,
    paddingForModalPageHeader: `${uiKitDesignTokens.spacing30} 0 ${uiKitDesignTokens.spacing40}`,
    paddingForModalTopBar: `${uiKitDesignTokens.spacing40} ${appKitSpacing55} ${uiKitDesignTokens.spacing20}`,
    paddingForPageContent: `${uiKitDesignTokens.spacing50} ${appKitSpacing55}`,
    paddingForTabularPageHeader: `${uiKitDesignTokens.spacing50} ${appKitSpacing55} 0`,
    paddingLeftForTabAsFirst: uiKitDesignTokens.spacing30,
    widthForDialogAsMedium: uiKitDesignTokens.constraint9,
    widthForDialogAsLarge: uiKitDesignTokens.constraint13,
    widthForPageLayoutContentColumn: `calc(${uiKitDesignTokens.constraint16} / 2)`,
  },
};

export const designTokens = transformTokensToCssVarsReferences(
  themesOverrides.default,
  { includeDefaultValue: false }
);
