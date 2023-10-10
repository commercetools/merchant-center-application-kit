import type { ReactElement, ReactNode, MouseEvent, KeyboardEvent } from 'react';
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
import PageTopBar from '../../internals/page-top-bar';
import { ContentWrapper, PageWrapper } from '../../internals/page.styles';
import {
  ControlsContainter,
  TabularPageContainer,
  FormControlsContainer,
} from '../../internals/tabular-page';

// NOTE: the `MessageDescriptor` type is exposed by `react-intl`.
// However, we need to explicitly define this otherwise the prop-types babel plugin
// does not recognize the object shape.
type MessageDescriptor = {
  id: string;
  description?: string | object;
  defaultMessage?: string;
  values?: Record<string, ReactNode>;
};

type TTabularDetailPageProps = {
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
   * Any React node to be rendered as the form controls
   */
  formControls?: ReactNode;
  /**
   * Determines if the form controls should be rendered.
   */
  hideControls: boolean;
  /**
   * This code is used to configure which Custom Views are available for this page.
   */
  customViewLocatorCode?: string;

  // PageTopBar props:
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

const defaultProps: Pick<TTabularDetailPageProps, 'hideControls'> = {
  hideControls: false,
};

const TabularDetailPage = (props: TTabularDetailPageProps) => {
  warning(
    props.title !== undefined || props.customTitleRow !== undefined,
    'TabularDetailPage: one of either `title` or `customTitleRow` is required but both their values are `undefined`'
  );

  return (
    <PageWrapper>
      <CustomViewsSelector
        customViewLocatorCode={props.customViewLocatorCode}
      />
      <TabularPageContainer color="neutral">
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
      </TabularPageContainer>
      <ContentWrapper>{props.children}</ContentWrapper>
    </PageWrapper>
  );
};
TabularDetailPage.displayName = 'TabularDetailPage';
TabularDetailPage.defaultProps = defaultProps;
// Static export of pre-configured form control buttons to easily re-use
// them in the custom controls.
TabularDetailPage.FormPrimaryButton = FormPrimaryButton;
TabularDetailPage.FormSecondaryButton = FormSecondaryButton;
TabularDetailPage.FormDeleteButton = FormDeleteButton;
// Static export of pre-configured page header title component to easily
// use as part of a custom title row
TabularDetailPage.PageHeaderTitle = PageHeaderTitle;
// This is a convenience proxy export to expose pre-defined Intl messages defined in the `@commercetools-frontend/i18n` package.
TabularDetailPage.Intl = sharedMessages;

export default TabularDetailPage;
