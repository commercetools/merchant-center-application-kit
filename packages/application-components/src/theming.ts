import {
  transformTokensToCssVarsReferences,
  designTokens as uiKitDesignTokens,
} from '@commercetools-uikit/design-system';

const spacing40 = '40px';

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
    heightForTab: '4px',
    marginBottomForPageTopBar: uiKitDesignTokens.spacingS,
    marginForModalPageHeader: `0 ${uiKitDesignTokens.spacingM}`,
    marginLeftForModalPageHeaderControls: uiKitDesignTokens.spacingM,
    marginTopForPageSubtitle: uiKitDesignTokens.spacingM,
    marginTopForTabControls: uiKitDesignTokens.spacingS,
    paddingForDetailPageHeader: uiKitDesignTokens.spacingM,
    paddingForDialogContent: `${uiKitDesignTokens.spacingM} 0 ${uiKitDesignTokens.spacingS}`,
    paddingForMainPageHeader: uiKitDesignTokens.spacingM,
    paddingForModalPageHeader: `${uiKitDesignTokens.spacingM} 0`,
    paddingForModalTopBar: `${uiKitDesignTokens.spacingS} ${uiKitDesignTokens.spacingM}`,
    paddingForPageContent: uiKitDesignTokens.spacingM,
    paddingForTabularPageHeader: `${uiKitDesignTokens.spacingM} ${uiKitDesignTokens.spacingM} 0`,
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
    heightForTab: '2px',
    marginBottomForPageTopBar: uiKitDesignTokens.spacingL,
    marginForModalPageHeader: `0 ${spacing40}`,
    marginLeftForModalPageHeaderControls: uiKitDesignTokens.spacingXl,
    marginTopForPageSubtitle: uiKitDesignTokens.spacingS,
    marginTopForTabControls: uiKitDesignTokens.spacingL,
    paddingForDetailPageHeader: `${uiKitDesignTokens.spacingXl} ${spacing40} ${uiKitDesignTokens.spacingL}`,
    paddingForDialogContent: `${uiKitDesignTokens.spacingL} 0 ${uiKitDesignTokens.spacingS}`,
    paddingForMainPageHeader: `${uiKitDesignTokens.spacingXl} ${spacing40} 0`,
    paddingForModalPageHeader: `${uiKitDesignTokens.spacingM} 0 ${uiKitDesignTokens.spacingL}`,
    paddingForModalTopBar: `${uiKitDesignTokens.spacingL} ${spacing40} ${uiKitDesignTokens.spacingS}`,
    paddingForPageContent: `${uiKitDesignTokens.spacingXl} ${spacing40}`,
    paddingForTabularPageHeader: `${uiKitDesignTokens.spacingXl} ${spacing40} 0`,
    paddingLeftForTabAsFirst: uiKitDesignTokens.spacingM,
    widthForDialogAsMedium: uiKitDesignTokens.constraint9,
    widthForDialogAsLarge: uiKitDesignTokens.constraint13,
    widthForPageLayoutContentColumn: `calc(${uiKitDesignTokens.constraint16} / 2)`,
  },
};

export const designTokens = transformTokensToCssVarsReferences(
  themesOverrides.default,
  { includeDefaultValue: false }
);
