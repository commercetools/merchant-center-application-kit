import type { ReactElement, ReactNode } from 'react';
import { css } from '@emotion/react';
import { sharedMessages } from '@commercetools-frontend/i18n';
import { designTokens as uiKitDesignTokens } from '@commercetools-uikit/design-system';
import Spacings from '@commercetools-uikit/spacings';
import { warning } from '@commercetools-uikit/utils';
import CustomViewsSelector from '../../custom-views/custom-views-selector';
import type { TCustomViewSelectorProps } from '../../custom-views/custom-views-selector/types';
import {
  FormPrimaryButton,
  FormSecondaryButton,
  FormDeleteButton,
} from '../../internals/default-form-buttons';
import PageHeaderTitle from '../../internals/page-header-title';
import { ContentWrapper, PageWrapper } from '../../internals/page.styles';
import {
  ControlsContainter,
  TabularPageContainer,
  FormControlsContainer,
  CustomViewsSelectorWrapper,
} from '../../internals/tabular-page';

type TTabularMainPageProps = {
  /**
   * The title of the page.
   */
  title?: string;
  /**
   * The subtitle of the page.
   */
  subtitle?: string | ReactElement;
  /**
   * Replaces the title/subtitle row with a custom one (for special use cases)
   */
  customTitleRow?: ReactNode;
  /**
   * Any React node displayed as the tab panel.
   */
  children: ReactNode;
  /**
   * A composition of tab components.
   */
  tabControls: ReactNode;
  /**
   * Any React node to be rendered as the form controls.
   */
  formControls?: ReactNode;
  /**
   * Determines if the form controls should be rendered.
   */
  hideControls?: boolean;
  /**
   * These codes are used to configure which Custom Views are available for every tab.
   */
  customViewLocatorCodes?: TCustomViewSelectorProps['customViewLocatorCodes'];
};

const TabularMainPage = ({
  hideControls = false,
  ...props
}: TTabularMainPageProps) => {
  warning(
    props.title !== undefined || props.customTitleRow !== undefined,
    'TabularMainPage: one of either `title` or `customTitleRow` is required but both their values are `undefined`'
  );

  return (
    <PageWrapper>
      <TabularPageContainer>
        {props.customTitleRow || (
          <PageHeaderTitle
            title={props.title ?? ''}
            subtitle={props.subtitle}
            titleSize="big"
          />
        )}
        <ControlsContainter
          tabControls={props.tabControls}
          formControls={
            <FormControlsContainer>
              {!hideControls && props.formControls && (
                <Spacings.Inline alignItems="flex-end">
                  {props.formControls}
                </Spacings.Inline>
              )}
            </FormControlsContainer>
          }
        />
      </TabularPageContainer>
      <CustomViewsSelectorWrapper>
        <CustomViewsSelector
          margin={`${uiKitDesignTokens.spacing30} 0 0 0`}
          customViewLocatorCodes={props.customViewLocatorCodes}
        />
      </CustomViewsSelectorWrapper>
      <ContentWrapper
        css={css`
          background-color: ${uiKitDesignTokens.colorSurface};
        `}
      >
        {props.children}
      </ContentWrapper>
    </PageWrapper>
  );
};
TabularMainPage.displayName = 'TabularMainPage';
// Static export of pre-configured form control buttons to easily re-use
// them in the custom controls.
TabularMainPage.FormPrimaryButton = FormPrimaryButton;
TabularMainPage.FormSecondaryButton = FormSecondaryButton;
TabularMainPage.FormDeleteButton = FormDeleteButton;
// Static export of pre-configured page header title component to easily
// use as part of a custom title row
TabularMainPage.PageHeaderTitle = PageHeaderTitle;
// This is a convenience proxy export to expose pre-defined Intl messages defined in the `@commercetools-frontend/i18n` package.
TabularMainPage.Intl = sharedMessages;

export default TabularMainPage;
