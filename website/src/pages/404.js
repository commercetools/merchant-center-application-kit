import React from 'react';
import Lottie from 'react-lottie';
import { css } from '@emotion/core';
import Layout from '../components/layout';
import pageMissingAnimation from './page-missing.json';

const NotFoundPage = () => (
  <Layout showSidebar={false} showFooter={false}>
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `}
    >
      <h1>Page not found</h1>
      <div
        css={css`
          max-width: 50%;
        `}
      >
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: pageMissingAnimation,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice',
            },
          }}
        />
      </div>
    </div>
  </Layout>
);
NotFoundPage.displayName = 'NotFoundPage';

export default NotFoundPage;
