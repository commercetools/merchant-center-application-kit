import type {
  ReactElement,
  ReactNode,
  MouseEvent,
  KeyboardEvent,
  SyntheticEvent,
} from 'react';
import { sharedMessages } from '@commercetools-frontend/i18n';
import type { TIconProps } from '@commercetools-uikit/design-system';
import PageHeaderTitle from '../../internals/page-header-title';
import CustomFormDetailPage from '../custom-form-detail-page';

// NOTE: the `MessageDescriptor` type is exposed by `react-intl`.
// However, we need to explicitly define this otherwise the prop-types babel plugin
// does not recognize the object shape.
type MessageDescriptor = {
  id: string;
  description?: string | object;
  defaultMessage?: string;
};
type Label = string | MessageDescriptor;

type FormDetailPageProps = {
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
  /**
   * Indicates whether the primary button is deactivated or not.
   */
  isPrimaryButtonDisabled?: boolean;
  /**
   * Indicates whether the secondary button is deactivated or not.
   */
  isSecondaryButtonDisabled?: boolean;
  /**
   * Use this prop to pass `data-` attributes to the primary button
   */
  dataAttributesPrimaryButton?: { [key: string]: string };
  /**
   * Use this prop to pass `data-` attributes to the secondary button.
   */
  dataAttributesSecondaryButton?: { [key: string]: string };
  /**
   * `Save` | The label for the primary button as a string, or as an Intl message.
   */
  labelPrimaryButton?: Label;
  /**
   * `Cancel` | The label for the secondary button as a string, or as an Intl message.
   */
  labelSecondaryButton?: Label;
  /**
   * Called when the primary button is clicked.
   */
  onPrimaryButtonClick: (event: SyntheticEvent) => void;
  /**
   * Called when the secondary button is clicked.
   */
  onSecondaryButtonClick: (event: SyntheticEvent) => void;
  /**
   * Hides the form controls.
   */
  hideControls?: boolean;
  /**
   * The Icon for the secondary button label
   */
  iconLeftSecondaryButton?: ReactElement<TIconProps>;
};

const FormDetailPage = ({
  hideControls = false,
  ...props
}: FormDetailPageProps) => (
  <CustomFormDetailPage
    title={props.title}
    subtitle={props.subtitle}
    customTitleRow={props.customTitleRow}
    customViewLocatorCode={props.customViewLocatorCode}
    previousPathLabel={props.previousPathLabel}
    onPreviousPathClick={props.onPreviousPathClick}
    hideControls={hideControls}
    formControls={
      <>
        <CustomFormDetailPage.FormSecondaryButton
          label={props.labelSecondaryButton}
          onClick={props.onSecondaryButtonClick}
          isDisabled={props.isSecondaryButtonDisabled}
          dataAttributes={props.dataAttributesSecondaryButton}
          iconLeft={props.iconLeftSecondaryButton}
        />
        <CustomFormDetailPage.FormPrimaryButton
          label={props.labelPrimaryButton}
          onClick={props.onPrimaryButtonClick}
          isDisabled={props.isPrimaryButtonDisabled}
          dataAttributes={props.dataAttributesPrimaryButton}
        />
      </>
    }
  >
    {props.children}
  </CustomFormDetailPage>
);
FormDetailPage.displayName = 'FormDetailPage';
// This is a convenience proxy export to expose pre-defined Intl messages defined in the `@commercetools-frontend/i18n` package.
// The Intl messages can be used for button labels.
// Static export of pre-configured page header title component to easily
// use as part of a custom title row
FormDetailPage.PageHeaderTitle = PageHeaderTitle;
// This is a convenience proxy export to expose pre-defined Intl messages defined in the `@commercetools-frontend/i18n` package.
// The Intl messages can be used for button labels.
FormDetailPage.Intl = sharedMessages;

export default FormDetailPage;
