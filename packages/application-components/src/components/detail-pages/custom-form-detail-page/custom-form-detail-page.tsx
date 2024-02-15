import type { ReactElement, ReactNode, MouseEvent, KeyboardEvent } from 'react';
import styled from '@emotion/styled';
import { sharedMessages } from '@commercetools-frontend/i18n';
import { designTokens as uiKitDesignTokens } from '@commercetools-uikit/design-system';
import Spacings from '@commercetools-uikit/spacings';
import { warning } from '@commercetools-uikit/utils';
import { designTokens as appKitDesignTokens } from '../../../theming';
import CustomViewsSelector from '../../custom-views/custom-views-selector';
import {
  FormPrimaryButton,
  FormSecondaryButton,
  FormDeleteButton,
} from '../../internals/default-form-buttons';
import PageHeaderTitle from '../../internals/page-header-title';
import PageTopBar from '../../internals/page-top-bar';
import { ContentWrapper, PageWrapper } from '../../internals/page.styles';

const DetailPageContainer = styled.div`
  background-color: ${uiKitDesignTokens.colorSurface};
  padding: ${appKitDesignTokens.paddingForDetailPageHeader};
  border-bottom: 1px ${uiKitDesignTokens.colorNeutral90} solid;
`;

const HeaderControlsWrapper = styled.div`
  margin-top: ${uiKitDesignTokens.spacingS};
`;

const getCustomViewsSelectorMargin = (hasContentBelow: boolean) =>
  `${uiKitDesignTokens.spacing40} 0 ${
    hasContentBelow ? uiKitDesignTokens.spacing40 : '0'
  } 0`;

// NOTE: the `MessageDescriptor` type is exposed by `react-intl`.
// However, we need to explicitly define this otherwise the prop-types babel plugin
// does not recognize the object shape.
type MessageDescriptor = {
  id: string;
  description?: string | object;
  defaultMessage?: string;
  values?: Record<string, ReactNode>;
};

type CustomFormDetailPageProps = {
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
   * Any React node displayed as the content within the page.
   */
  children: ReactNode;

  // Controls Props
  /**
   * Any React node to be rendered as the form controls
   */
  formControls?: ReactNode;
  /**
   * Determines if the form controls should be rendered.
   */
  hideControls?: boolean;
  /**
   * A return route path label.
   */
  previousPathLabel?: string | MessageDescriptor;
  /**
   * This code is used to configure which Custom Views are available for this page.
   */
  customViewLocatorCode?: string;
  /**
   * Function called when back button is pressed.
   */
  onPreviousPathClick: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
};

const defaultProps: Pick<CustomFormDetailPageProps, 'hideControls'> = {
  hideControls: false,
};

const CustomFormDetailPage = (props: CustomFormDetailPageProps) => {
  warning(
    props.title !== undefined || props.customTitleRow !== undefined,
    'DetailPage: one of either `title` or `customTitleRow` is required but both their values are `undefined`'
  );

  return (
    <PageWrapper>
      <DetailPageContainer>
        <PageTopBar
          color="neutral"
          previousPathLabel={props.previousPathLabel}
          onClick={props.onPreviousPathClick}
        />
        {props.customTitleRow || (
          <PageHeaderTitle
            title={props.title ?? ''}
            subtitle={props.subtitle}
            titleSize="big"
          />
        )}
        <CustomViewsSelector
          margin={getCustomViewsSelectorMargin(
            !props.hideControls && !!props.formControls
          )}
          customViewLocatorCode={props.customViewLocatorCode}
        />
        {!props.hideControls && props.formControls && (
          <HeaderControlsWrapper>
            <Spacings.Inline justifyContent="flex-end">
              {props.formControls}
            </Spacings.Inline>
          </HeaderControlsWrapper>
        )}
      </DetailPageContainer>
      <ContentWrapper>{props.children}</ContentWrapper>
    </PageWrapper>
  );
};
CustomFormDetailPage.displayName = 'CustomFormDetailPage';
CustomFormDetailPage.defaultProps = defaultProps;
// Static export of pre-configured page header title component to easily
// use as part of a custom title row
CustomFormDetailPage.PageHeaderTitle = PageHeaderTitle;
// Static export of pre-configured form control buttons to easily re-use
// them in the custom controls.
CustomFormDetailPage.FormPrimaryButton = FormPrimaryButton;
CustomFormDetailPage.FormSecondaryButton = FormSecondaryButton;
CustomFormDetailPage.FormDeleteButton = FormDeleteButton;
// This is a convenience proxy export to expose pre-defined Intl messages defined in the `@commercetools-frontend/i18n` package.
// The Intl messages can be used for button labels.
CustomFormDetailPage.Intl = sharedMessages;

export default CustomFormDetailPage;
