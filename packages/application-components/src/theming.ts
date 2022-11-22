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
    marginBottomForPageTopBar: uiKitDesignTokens.spacingS,
    marginTopForPageHeaderControls: uiKitDesignTokens.spacingS,
    marginTopForTabControls: uiKitDesignTokens.spacingM,
    paddingForPageHeader: `${uiKitDesignTokens.spacingM}`,
    paddingForPageContent: uiKitDesignTokens.spacingM,

    paddingForTabularPageHeader: `${uiKitDesignTokens.spacingM} ${uiKitDesignTokens.spacingM} 0`,
    borderBottomForTabularPageHeader: `1px solid ${uiKitDesignTokens.colorNeutral}`,
    paddingLeftForTabAsFirst: '0',
    heightForTab: '4px',
    marginTopForPageSubtitle: uiKitDesignTokens.spacingM,
    backgroundColorForTabularMainPageContent: uiKitDesignTokens.colorNeutral95,
    borderColorForDialogDivider: uiKitDesignTokens.colorNeutral,
    paddingForDialogContent: `${uiKitDesignTokens.spacingM} 0 ${uiKitDesignTokens.spacingS}`,

    paddingForModalTopBar: `${uiKitDesignTokens.spacingS} ${uiKitDesignTokens.spacingM}`,
    marginForModalPageHeader: `0 ${uiKitDesignTokens.spacingM}`,
    borderColorForModalTopBarWhenSurface: uiKitDesignTokens.colorNeutral,
    borderColorForModalPageHeaderDivider: uiKitDesignTokens.colorNeutral60,
  },
  test: {
    // TODO: To be removed when we update the ui-kit dependency
    lineHeightForTextAsH1: uiKitDesignTokens.lineHeight60,
    lineHeightForTextAsH2: uiKitDesignTokens.lineHeight60,

    colorForPageHeaderBottomBorder: uiKitDesignTokens.colorNeutral90,
    backgroundColorForMainPageDivider: uiKitDesignTokens.colorNeutral90,
    backgroundColorForPageHeader: uiKitDesignTokens.colorSurface,
    marginBottomForPageTopBar: uiKitDesignTokens.spacingL,
    marginTopForPageHeaderControls: uiKitDesignTokens.spacingS,
    marginTopForTabControls: uiKitDesignTokens.spacingL,
    // TODO: 40px is to be updated once ui-kit export a new spacing size
    paddingForPageHeader: `${uiKitDesignTokens.spacingXl} 40px`,
    paddingForPageContent: `${uiKitDesignTokens.spacingL} 40px`,

    paddingForTabularPageHeader: `${uiKitDesignTokens.spacingXl} 40px 0`,
    borderBottomForTabularPageHeader: `1px solid ${uiKitDesignTokens.colorNeutral90}`,
    paddingLeftForTabAsFirst: uiKitDesignTokens.spacingM,
    heightForTab: '2px',
    marginTopForPageSubtitle: uiKitDesignTokens.spacingS,
    backgroundColorForTabularMainPageContent: uiKitDesignTokens.colorSurface,
    borderColorForDialogDivider: uiKitDesignTokens.colorNeutral90,
    paddingForDialogContent: `${uiKitDesignTokens.spacingL} 0 ${uiKitDesignTokens.spacingS}`,

    paddingForModalTopBar: `${uiKitDesignTokens.spacingL} 40px ${uiKitDesignTokens.spacingS}`,
    marginForModalPageHeader: `0 40px`,
    borderColorForModalTopBarWhenSurface: uiKitDesignTokens.colorSurface,
    borderColorForModalPageHeaderDivider: uiKitDesignTokens.colorNeutral90,
  },
};

export const designTokens = transformTokensToCssVarsReferences(
  themesOverrides.default
);
