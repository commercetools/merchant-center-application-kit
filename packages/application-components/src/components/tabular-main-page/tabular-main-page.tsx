import type { ReactElement, ReactNode } from 'react';
import Spacings from '@commercetools-uikit/spacings';
import { sharedMessages } from '@commercetools-frontend/i18n';
import { css } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';
import PageHeaderTitle from '../internals/page-header-title';
import {
  ControlsContainter,
  TabularPageContainer,
} from '../internals/tabular-page';
import { ContentWrapper, PageWrapper } from '../internals/page.styles';

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
        <ControlsContainter tabControls={props.tabControls} />
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
// This is a convenience proxy export to expose pre-defined Intl messages defined in the `@commercetools-frontend/i18n` package.
TabularMainPage.Intl = sharedMessages;

export default TabularMainPage;
