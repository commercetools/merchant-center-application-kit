import { ReactNode } from 'react';
import { css } from '@emotion/react';

export type TPageContentFull = {
  children: ReactNode;
};

function PageContentFull(props: TPageContentFull) {
  return (
    <div
      css={css`
        width: 100%;
      `}
    >
      <section>{props.children}</section>
    </div>
  );
}

export default PageContentFull;
