/// <reference types="@emotion/react/types/css-prop" />
/// <reference types="vite/client" />

import { css } from '@emotion/react';
import InlineSvg from '@commercetools-uikit/icons/inline-svg';
import Grid from '@commercetools-uikit/grid';
import { customProperties } from '@commercetools-uikit/design-system';
import { Suite, Spec } from '../../test-utils';

const svgIconsModules = import.meta.glob<string>(
  '/../packages/assets/application-icons/*.svg',
  { as: 'raw', eager: true }
);

const svgIcons = Object.entries<string>(svgIconsModules).reduce<
  Record<string, string>
>((allIcons, [filePath, rawSvg]) => {
  const name = filePath.replace(/\.\/(.*)\.svg$/, '$1') || filePath;
  return {
    ...allIcons,
    [name]: rawSvg,
  };
}, {});

const IconsGrid = (props: {
  color:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
}) => (
  <Grid
    gridGap={customProperties.spacingS}
    gridAutoColumns="1fr"
    gridTemplateColumns={`repeat(auto-fill, minmax(calc(${customProperties.spacingXl} * 2), 1fr))`}
  >
    {Object.keys(svgIcons).map((iconName) => {
      const data = svgIcons[iconName];
      return (
        <Grid.Item key={iconName} justifySelf="center">
          <div
            css={css`
              padding: ${customProperties.spacingS};
              width: calc(${customProperties.spacingXl} * 2);
              height: calc(${customProperties.spacingXl} * 2);
            `}
          >
            <InlineSvg data={data} size="scale" color={props.color} />
          </div>
        </Grid.Item>
      );
    })}
  </Grid>
);

export const routePath = '/application-icons';

export const Component = () => (
  <Suite>
    <Spec label="Application icons (solid)">
      <IconsGrid color="solid" />
    </Spec>
    <Spec label="Application icons (primary)">
      <IconsGrid color="primary" />
    </Spec>
    <Spec label="Application icons (warning)">
      <IconsGrid color="warning" />
    </Spec>
  </Suite>
);
