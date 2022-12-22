import { ReactNode } from 'react';
import { css } from '@emotion/react';

export type TPageContentFull = {
  children: ReactNode;
};

function PageContentFull(props: TPageContentFull) {
  return (
    <section
      css={css`
        width: 100%;
      `}
    >
      <div>{props.children}</div>
    </section>
  );
}

export default PageContentFull;
