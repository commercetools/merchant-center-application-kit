import type { ReactElement, ReactNode } from 'react';
import { customProperties } from '@commercetools-uikit/design-system';
import { css } from '@emotion/react';
import PageHeaderTitle from './page-header-title';

type Props = {
  title: string;
  subtitle?: string | ReactElement;
  children?: ReactNode;
};

const PageHeader = (props: Props) => (
  <div
    css={css`
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin: 0 ${customProperties.spacingM};
      padding: ${customProperties.spacingM} 0;
      border-bottom: 1px solid ${customProperties.colorNeutral60};
      & > * + * {
        margin-left: ${customProperties.spacingM};
      }
    `}
  >
    <PageHeaderTitle title={props.title} subtitle={props.subtitle} />
    {props.children}
  </div>
);
PageHeader.displayName = 'PageHeader';

export default PageHeader;
