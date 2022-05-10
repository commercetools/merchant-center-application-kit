import type { ReactElement, ReactNode, MouseEvent, KeyboardEvent } from 'react';
import PageHeaderTitle from '../../internals/page-header-title';
import CustomFormDetailPage from '../custom-form-detail-page';

// NOTE: the `MessageDescriptor` type is exposed by `react-intl`.
// However, we need to explicitly define this otherwise the prop-types babel plugin
// does not recognize the object shape.
type MessageDescriptor = {
  id: string;
  description?: string | object;
  defaultMessage?: string;
  values?: Record<string, ReactNode>;
};

type InfoDetailPageProps = {
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

  // PageTopBar props:
  /**
   * Makes page top bar visible
   */
  showPageTopBar?: boolean;
  /**
   * A return route path label.
   */
  previousPathLabel?: string | MessageDescriptor;
  /**
   * Function called when back button is pressed.
   */
  onPreviousPathClick?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
};

const defaultProps: Pick<InfoDetailPageProps, 'showPageTopBar'> = {
  showPageTopBar: true,
};

const InfoDetailPage = (props: InfoDetailPageProps) => (
  <CustomFormDetailPage
    title={props.title}
    subtitle={props.subtitle}
    customTitleRow={props.customTitleRow}
    showPageTopBar={props.showPageTopBar}
    previousPathLabel={props.previousPathLabel}
    onPreviousPathClick={props.onPreviousPathClick}
  >
    {props.children}
  </CustomFormDetailPage>
);
InfoDetailPage.displayName = 'InfoDetailPage';
InfoDetailPage.defaultProps = defaultProps;
// Static export of pre-configured page header title component to easily
// use as part of a custom title row
InfoDetailPage.PageHeaderTitle = PageHeaderTitle;

export default InfoDetailPage;
