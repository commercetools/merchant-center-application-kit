import type { ReactElement, ReactNode } from 'react';
import Spacings from '@commercetools-uikit/spacings';
import { sharedMessages } from '@commercetools-frontend/i18n';
import { css } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';
import PageHeaderTitle from '../internals/page-header-title';
import {
  ControlsContainter,
  TabularPageContainer,
  FormControlsContainer,
} from '../internals/tabular-page';
import { ContentWrapper, PageWrapper } from '../internals/page.styles';
import {
  FormPrimaryButton,
  FormSecondaryButton,
  FormDeleteButton,
} from '../internals/default-form-buttons';

type TTabularMainPageProps = {
  /**
   * The title of the page.
   */
  title: string;
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
  hideControls: boolean;
};

const defaultProps: Pick<TTabularMainPageProps, 'hideControls'> = {
  hideControls: false,
};

const TabularMainPage = (props: TTabularMainPageProps) => (
  <PageWrapper>
    <TabularPageContainer color="surface">
      <Spacings.Stack>
        {props.customTitleRow || (
          <PageHeaderTitle
            title={props.title}
            subtitle={props.subtitle}
            titleSize="big"
          />
        )}
        <ControlsContainter
          tabControls={props.tabControls}
          formControls={
            <FormControlsContainer>
              {!props.hideControls && props.formControls && (
                <Spacings.Inline alignItems="flex-end">
                  {props.formControls}
                </Spacings.Inline>
              )}
            </FormControlsContainer>
          }
        />
      </Spacings.Stack>
    </TabularPageContainer>
    <ContentWrapper
      css={css`
        background-color: ${customProperties.colorNeutral95};
      `}
    >
      {props.children}
    </ContentWrapper>
  </PageWrapper>
);
TabularMainPage.displayName = 'TabularMainPage';
TabularMainPage.defaultProps = defaultProps;
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
