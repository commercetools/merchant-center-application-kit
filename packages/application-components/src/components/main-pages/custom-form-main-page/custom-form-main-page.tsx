import type { ReactElement, ReactNode } from 'react';
import { sharedMessages } from '@commercetools-frontend/i18n';
import Spacings from '@commercetools-uikit/spacings';
import { warning } from '@commercetools-uikit/utils';
import CustomViewsSelector from '../../custom-views/custom-views-selector';
import {
  FormPrimaryButton,
  FormSecondaryButton,
  FormDeleteButton,
} from '../../internals/default-form-buttons';
import PageHeaderTitle from '../../internals/page-header-title';
import { PageWrapper } from '../../internals/page.styles';
import {
  Divider,
  MainPageContainer,
  MainPageContent,
} from '../internals/main-page.styles';

type CustomFormMainPageProps = {
  /**
   * The title of the page.
   */
  title?: string;
  /**
   * The subtitle of the page.
   */
  subtitle?: string | ReactElement;
  /**
   * Replaces the title/subtitle row with a custom one (for special use cases).
   */
  customTitleRow?: ReactNode;
  /**
   * This code is used to configure which Custom Views are available for this page.
   */
  customViewLocatorCode?: string;
  /**
   * Any React node displayed as the content within the page.
   */
  children: ReactNode;

  // Controls Props
  /**
   * Any React node to be rendered as the form controls.
   */
  formControls?: ReactNode;
  /**
   * Determines if the form controls should be rendered.
   */
  hideControls?: boolean;
  /**
   * Determines whether the divider between header and content should be hidden.
   * (default: false)
   */
  hideDivider?: boolean;
};

const defaultProps: Pick<
  CustomFormMainPageProps,
  'hideControls' | 'hideDivider'
> = {
  hideControls: false,
  hideDivider: false,
};

const CustomFormMainPage = (props: CustomFormMainPageProps) => {
  warning(
    props.title !== undefined || props.customTitleRow !== undefined,
    'CustomFormMainPage: one of either `title` or `customTitleRow` is required but both their values are `undefined`'
  );

  return (
    <PageWrapper>
      <CustomViewsSelector
        customViewLocatorCode={props.customViewLocatorCode}
      />
      <MainPageContainer>
        <Spacings.Stack scale="l">
          {props.customTitleRow || (
            <PageHeaderTitle
              title={props.title ?? ''}
              subtitle={props.subtitle}
              titleSize="big"
            />
          )}
          {!props.hideControls && props.formControls && (
            <Spacings.Inline justifyContent="flex-end">
              {props.formControls}
            </Spacings.Inline>
          )}
          {!props.hideDivider && <Divider />}
        </Spacings.Stack>
      </MainPageContainer>
      <MainPageContent>{props.children}</MainPageContent>
    </PageWrapper>
  );
};

CustomFormMainPage.displayName = 'CustomFormMainPage';
CustomFormMainPage.defaultProps = defaultProps;

// Static export of pre-configured page header title component to easily
// use as part of a custom title row
CustomFormMainPage.PageHeaderTitle = PageHeaderTitle;

// Static export of pre-configured form control buttons to easily re-use
// them in the custom controls.
CustomFormMainPage.FormPrimaryButton = FormPrimaryButton;
CustomFormMainPage.FormSecondaryButton = FormSecondaryButton;
CustomFormMainPage.FormDeleteButton = FormDeleteButton;

// This is a convenience proxy export to expose pre-defined Intl messages defined in the `@commercetools-frontend/i18n` package.
// The Intl messages can be used for button labels.
CustomFormMainPage.Intl = sharedMessages;

export default CustomFormMainPage;
