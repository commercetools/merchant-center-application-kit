import type { ReactElement, ReactNode, MouseEvent, KeyboardEvent } from 'react';
import Spacings from '@commercetools-uikit/spacings';
import { sharedMessages } from '@commercetools-frontend/i18n';
import PageHeaderTitle from '../internals/page-header-title';
import PageTopBar from '../internals/page-top-bar';
import {
  ControlsContainter,
  TabularPageContainer,
} from '../internals/tabular-page';
import { ContentWrapper, PageWrapper } from '../internals/page.styles';

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

  // PageTopBar props:
  /**
   * A return route path label.
   */
  previousPathLabel?: string | MessageDescriptor;
  /**
   * Function called when back button is pressed.
   */
  onClose: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
};

const TabularDetailPage = (props: TTabularDetailPageProps) => (
  <PageWrapper>
    <TabularPageContainer color="neutral">
      <Spacings.Stack>
        <PageTopBar
          color="neutral"
          previousPathLabel={props.previousPathLabel}
          onClick={props.onClose}
        />
        {props.customTitleRow || (
          <PageHeaderTitle
            title={props.title}
            subtitle={props.subtitle}
            titleSize="big"
          />
        )}
        <ControlsContainter tabControls={props.tabControls} />
      </Spacings.Stack>
    </TabularPageContainer>
    <ContentWrapper>{props.children}</ContentWrapper>
  </PageWrapper>
);
TabularDetailPage.displayName = 'TabularDetailPage';
// This is a convenience proxy export to expose pre-defined Intl messages defined in the `@commercetools-frontend/i18n` package.
TabularDetailPage.Intl = sharedMessages;

export default TabularDetailPage;
