import type { ReactElement, ReactNode } from 'react';
import PageHeaderTitle from '../../internals/page-header-title';
import CustomFormMainPage from '../custom-form-main-page';

type InfoMainPageProps = {
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
};

const InfoMainPage = (props: InfoMainPageProps) => {
  return (
    <CustomFormMainPage
      title={props.title}
      subtitle={props.subtitle}
      customTitleRow={props.customTitleRow}
      hideDivider={true}
    >
      {props.children}
    </CustomFormMainPage>
  );
};

InfoMainPage.displayName = 'InfoMainPage';
// Static export of pre-configured page header title component to easily
// use as part of a custom title row
InfoMainPage.PageHeaderTitle = PageHeaderTitle;

export default InfoMainPage;
