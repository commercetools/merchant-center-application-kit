import type { ReactElement, ReactNode, MouseEvent, KeyboardEvent } from 'react';
import { warning } from '@commercetools-uikit/utils';
import styled from '@emotion/styled';
import { customProperties } from '@commercetools-uikit/design-system';
import Spacings from '@commercetools-uikit/spacings';
import PageHeaderTitle from '../../internals/page-header-title';
import PageTopBar from '../../internals/page-top-bar';
import { ContentWrapper, PageWrapper } from '../../internals/page.styles';

const noop = () => {};

const DetailPageContainer = styled.div`
  background-color: ${customProperties.colorNeutral95};
  padding: ${customProperties.spacingM};
  border-bottom: 1px ${customProperties.colorNeutral} solid;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
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

type DetailPageProps = {
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

  headerExtraContent?: ReactNode;

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

const defaultProps: Pick<DetailPageProps, 'showPageTopBar'> = {
  showPageTopBar: true,
};

function DetailPage(props: DetailPageProps) {
  warning(
    props.title !== undefined || props.customTitleRow !== undefined,
    'DetailPage: one of either `title` or `customTitleRow` is required but both their values are `undefined`'
  );
  if (props.showPageTopBar) {
    warning(
      Boolean(props.onPreviousPathClick),
      'DetailPage: `onPreviousPathClick` is required when page top bar is visible.'
    );
  }

  return (
    <PageWrapper>
      <DetailPageContainer>
        <Spacings.Stack>
          {props.showPageTopBar && (
            <PageTopBar
              color="neutral"
              previousPathLabel={props.previousPathLabel}
              onClick={props.onPreviousPathClick ?? noop}
            />
          )}
          {props.customTitleRow || (
            <PageHeaderTitle
              title={props.title ?? ''}
              subtitle={props.subtitle}
              titleSize="big"
            />
          )}
        </Spacings.Stack>
        {/* {!props.hideControls && props.formControls && (
          <Spacings.Inline alignItems="flex-end">
            {props.formControls}
          </Spacings.Inline>
        )} */}
        {props.headerExtraContent}
      </DetailPageContainer>
      <ContentWrapper>{props.children}</ContentWrapper>
    </PageWrapper>
  );
}

DetailPage.displayName = 'DetailPage';
DetailPage.defaultProps = defaultProps;

export default DetailPage;
