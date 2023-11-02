import { css } from '@emotion/react';
import { Markdown } from '@commercetools-docs/ui-kit';
import { customProperties } from '@commercetools-uikit/design-system';
import Grid from '@commercetools-uikit/grid';
import InlineSvg from '@commercetools-uikit/icons/inline-svg';
import SpacingsStack from '@commercetools-uikit/spacings-stack';

// Cache object to store references so SVG icons.
const svgIcons = {};
const importAllSvgs = (requireContext) =>
  requireContext.keys().forEach((filePath) => {
    const name = filePath.replace(/\.\/(.*)\.svg$/, '$1') || filePath;
    svgIcons[name] = requireContext(filePath);
  });
importAllSvgs(
  require.context(
    '!!raw-loader!@commercetools-frontend/assets/application-icons',
    false,
    /.svg$/
  )
);

const ApplicationIcons = () => (
  <Grid
    gridGap={customProperties.spacingS}
    gridAutoColumns="1fr"
    gridTemplateColumns={`repeat(auto-fill, minmax(calc(${customProperties.spacingXl} * 4), 1fr))`}
  >
    {Object.keys(svgIcons).map((iconName, index) => {
      const data = svgIcons[iconName].default;
      return (
        <Grid.Item key={iconName} justifySelf="center">
          <SpacingsStack alignItems="center">
            <div
              css={css`
                width: calc(${customProperties.spacingXl} * 1.5);
                height: calc(${customProperties.spacingXl} * 1.5);
              `}
            >
              <InlineSvg data={data} size="scale" color="solid" />
            </div>
            <Markdown.InlineCode>{iconName}</Markdown.InlineCode>
          </SpacingsStack>
        </Grid.Item>
      );
    })}
  </Grid>
);

export default ApplicationIcons;
