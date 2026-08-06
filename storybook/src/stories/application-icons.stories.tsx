import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { customProperties } from '@commercetools-uikit/design-system';
import Grid from '@commercetools-uikit/grid';
import InlineSvg from '@commercetools-uikit/icons/inline-svg';
import { VisualSpecGroup } from '../helpers';

const svgIconsModules = import.meta.glob<string>(
  '../../../packages/assets/application-icons/*.svg',
  { query: '?raw', import: 'default', eager: true }
);

const svgIcons = Object.entries(svgIconsModules).reduce<Record<string, string>>(
  (allIcons, [filePath, rawSvg]) => {
    const name =
      filePath
        .split('/')
        .pop()
        ?.replace(/\.svg$/, '') ?? filePath;
    return { ...allIcons, [name]: rawSvg };
  },
  {}
);

type TIconColor = Parameters<typeof InlineSvg>[0]['color'];

const IconsGrid = ({ color }: { color: TIconColor }) => (
  <Grid
    gridGap={customProperties.spacingS}
    gridAutoColumns="1fr"
    gridTemplateColumns={`repeat(auto-fill, minmax(calc(${customProperties.spacingXl} * 2), 1fr))`}
  >
    {Object.keys(svgIcons).map((iconName) => (
      <Grid.Item key={iconName} justifySelf="center">
        <div
          css={css`
            padding: ${customProperties.spacingS};
            width: calc(${customProperties.spacingXl} * 2);
            height: calc(${customProperties.spacingXl} * 2);
          `}
        >
          <InlineSvg data={svgIcons[iconName]} size="scale" color={color} />
        </div>
      </Grid.Item>
    ))}
  </Grid>
);

const meta: Meta = {
  title: 'Assets/ApplicationIcons',
};

export default meta;

type Story = StoryObj;

export const AllVariants: Story = {
  render: () => (
    <>
      <VisualSpecGroup label="Application icons (solid)">
        <IconsGrid color="solid" />
      </VisualSpecGroup>
      <VisualSpecGroup label="Application icons (primary)">
        <IconsGrid color="primary" />
      </VisualSpecGroup>
      <VisualSpecGroup label="Application icons (warning)">
        <IconsGrid color="warning" />
      </VisualSpecGroup>
      <VisualSpecGroup label="Application icons (success)">
        <IconsGrid color="success" />
      </VisualSpecGroup>
    </>
  ),
};
