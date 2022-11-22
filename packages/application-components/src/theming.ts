import {
  transformTokensToCssVarsReferences,
  designTokens as uiKitDesignTokens,
} from '@commercetools-uikit/design-system';

export const themesOverrides = {
  default: {
    // TODO: To be removed when we update the ui-kit dependency
    lineHeightForTextAsH1: 'inherit',
    lineHeightForTextAsH2: 'inherit',

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
    marginTopForPageHeaderControls: uiKitDesignTokens.spacingS,
    marginTopForPageSubtitle: uiKitDesignTokens.spacingM,
    marginTopForTabControls: uiKitDesignTokens.spacingM,
    paddingForDialogContent: `${uiKitDesignTokens.spacingM} 0 ${uiKitDesignTokens.spacingS}`,
    paddingForModalTopBar: `${uiKitDesignTokens.spacingS} ${uiKitDesignTokens.spacingM}`,
    paddingForPageContent: uiKitDesignTokens.spacingM,
    paddingForPageHeader: `${uiKitDesignTokens.spacingM}`,
    paddingForTabularPageHeader: `${uiKitDesignTokens.spacingM} ${uiKitDesignTokens.spacingM} 0`,
    paddingLeftForTabAsFirst: '0',
  },
  test: {
    // TODO: To be removed when we update the ui-kit dependency
    lineHeightForTextAsH1: uiKitDesignTokens.lineHeight60,
    lineHeightForTextAsH2: uiKitDesignTokens.lineHeight60,

    colorForPageHeaderBottomBorder: uiKitDesignTokens.colorNeutral90,
    backgroundColorForMainPageDivider: uiKitDesignTokens.colorNeutral90,
    backgroundColorForPageHeader: uiKitDesignTokens.colorSurface,
    backgroundColorForTabularMainPageContent: uiKitDesignTokens.colorSurface,
    borderBottomForTabularPageHeader: `1px solid ${uiKitDesignTokens.colorNeutral90}`,
    borderColorForDialogDivider: uiKitDesignTokens.colorNeutral90,
    borderColorForModalPageHeaderDivider: uiKitDesignTokens.colorNeutral90,
    borderColorForModalTopBarWhenSurface: uiKitDesignTokens.colorSurface,
    marginBottomForPageTopBar: uiKitDesignTokens.spacingL,
    marginForModalPageHeader: `0 40px`,
    marginTopForPageHeaderControls: uiKitDesignTokens.spacingS,
    marginTopForPageSubtitle: uiKitDesignTokens.spacingS,
    marginTopForTabControls: uiKitDesignTokens.spacingL,
    heightForTab: '2px',
    paddingForDialogContent: `${uiKitDesignTokens.spacingL} 0 ${uiKitDesignTokens.spacingS}`,
    paddingForModalTopBar: `${uiKitDesignTokens.spacingL} 40px ${uiKitDesignTokens.spacingS}`,
    paddingForPageHeader: `${uiKitDesignTokens.spacingXl} 40px`,
    paddingForPageContent: `${uiKitDesignTokens.spacingL} 40px`,
    paddingForTabularPageHeader: `${uiKitDesignTokens.spacingXl} 40px 0`,
    paddingLeftForTabAsFirst: uiKitDesignTokens.spacingM,
  },
};

export const designTokens = transformTokensToCssVarsReferences(
  themesOverrides.default
);
