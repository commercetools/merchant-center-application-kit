import type { ReactElement, ReactNode } from 'react';
import Spacings from '@commercetools-uikit/spacings';
import { sharedMessages } from '@commercetools-frontend/i18n';
import { useIntl } from 'react-intl';
import { warning } from '@commercetools-uikit/utils';
import { css } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';
import PageHeaderTitle from '../internals/page-header-title';
import {
  ControlsContainter,
  TabularPageContainer,
} from '../internals/tabular-page';
import { ContentWrapper } from '../internals/page.styles';

// NOTE: the `MessageDescriptor` type is exposed by `react-intl`.
// However, we need to explicitly define this otherwise the prop-types babel plugin
// does not recognize the object shape.
type MessageDescriptor = {
  id: string;
  description?: string | object;
  defaultMessage?: string;
};

type TTabularMainPageProps = {
  /**
   * The title of the page.
   * <br />
   * Required when neither `titleIntlMessage` nor `customTitleRow` are provided.
   */
  title?: string;
  /**
   * The title of the page, using an `intl` message object.
   * <br />
   * Required when neither `title` nor `customTitleRow` are provided.
   */
  titleIntlMessage?: MessageDescriptor & {
    values?: Record<string, ReactNode>;
  };
  /**
   * The subtitle of the page.
   */
  subtitle?: string | ReactElement;
  /**
   * The subtitle of the page, using an `intl` message object.
   */
  subtitleIntlMessage?: MessageDescriptor & {
    values?: Record<string, ReactNode>;
  };
  /**
   * Replaces the title/subtitle row with a custom one (for special use cases)
   * <br />
   * Required when neither `title` nor `titleIntlMessage` are provided.
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

const warnIfMissingContent = (props: TTabularMainPageProps) => {
  const hasContent =
    Boolean(props.customTitleRow) ||
    Boolean(props.titleIntlMessage) ||
    Boolean(props.title);

  warning(
    hasContent,
    'TabularMainPage: one of either `title`, `titleIntlMessage` or `customTitleRow` is required but their values are `undefined`'
  );
};

const TabularMainPage = (props: TTabularMainPageProps) => {
  const intl = useIntl();

  let titleToDisplay = props.title;
  if (props.titleIntlMessage) {
    titleToDisplay = intl.formatMessage(props.titleIntlMessage);
  }

  let subtitleToDisplay = props.subtitle;
  if (props.subtitleIntlMessage) {
    subtitleToDisplay = intl.formatMessage(props.subtitleIntlMessage);
  }

  warnIfMissingContent(props);

  return (
    <div>
      <TabularPageContainer color="surface">
        <Spacings.Stack>
          {props.customTitleRow ||
            (titleToDisplay && (
              <PageHeaderTitle
                title={titleToDisplay}
                subtitle={subtitleToDisplay}
                titleSize="big"
              />
            ))}
          <ControlsContainter tabControls={props.tabControls} />
        </Spacings.Stack>
      </TabularPageContainer>
      <ContentWrapper
        // @ts-ignore
        css={css`
          background-color: ${customProperties.colorNeutral95};
        `}
      >
        {props.children}
      </ContentWrapper>
    </div>
  );
};
TabularMainPage.displayName = 'TabularMainPage';
// This is a convenience proxy export to expose pre-defined Intl messages defined in the `@commercetools-frontend/i18n` package.
TabularMainPage.Intl = sharedMessages;

export default TabularMainPage;
