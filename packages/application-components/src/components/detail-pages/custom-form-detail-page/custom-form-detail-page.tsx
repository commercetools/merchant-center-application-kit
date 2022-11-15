import type { ReactElement, ReactNode, MouseEvent, KeyboardEvent } from 'react';
import { sharedMessages } from '@commercetools-frontend/i18n';
import { warning } from '@commercetools-uikit/utils';
import styled from '@emotion/styled';
import { customProperties } from '@commercetools-uikit/design-system';
import {
  FormPrimaryButton,
  FormSecondaryButton,
  FormDeleteButton,
} from '../../internals/default-form-buttons';
import Spacings from '@commercetools-uikit/spacings';
import PageHeaderTitle from '../../internals/page-header-title';
import PageTopBar from '../../internals/page-top-bar';
import { ContentWrapper, PageWrapper } from '../../internals/page.styles';
import { designTokens as appKitDesignTokens } from '../../../theming';

const DetailPageContainer = styled.div`
  background-color: ${appKitDesignTokens.backgroundColorForPageHeader};
  border-bottom: 1px ${customProperties.colorNeutral} solid;
  padding: ${appKitDesignTokens.paddingForPage};
`;

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
        <Spacings.Stack>
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
          {!props.hideControls && props.formControls && (
            <Spacings.Inline justifyContent="flex-end">
              {props.formControls}
            </Spacings.Inline>
          )}
        </Spacings.Stack>
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
