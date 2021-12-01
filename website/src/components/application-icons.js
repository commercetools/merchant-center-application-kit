import { css } from '@emotion/react';
import InlineSvg from '@commercetools-uikit/icons/inline-svg';
import Spacings from '@commercetools-uikit/spacings';
import Grid from '@commercetools-uikit/grid';
import { customProperties } from '@commercetools-uikit/design-system';
import { Markdown } from '@commercetools-docs/ui-kit';

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
          <Spacings.Stack alignItems="center">
            <div
              css={css`
                padding: ${customProperties.spacingS};
                width: calc(${customProperties.spacingXl} * 1.5);
                height: calc(${customProperties.spacingXl} * 1.5);
              `}
            >
              <InlineSvg data={data} size="scale" color="solid" />
            </div>
            <Markdown.InlineCode>{iconName}</Markdown.InlineCode>
          </Spacings.Stack>
        </Grid.Item>
      );
    })}
  </Grid>
);

export default ApplicationIcons;
