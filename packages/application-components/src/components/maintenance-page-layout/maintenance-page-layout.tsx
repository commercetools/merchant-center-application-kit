import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import Constraints from '@commercetools-uikit/constraints';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';

export type Props = {
  imageSrc: string;
  title: React.ReactNode;
  label?: string;
  paragraph1: React.ReactNode;
  paragraph2?: React.ReactNode;
  bodyContent?: React.ReactNode;
  children?: never;
};

const MaintenancePageLayout = (props: Props) => (
  <div
    css={css`
      display: grid;
      align-items: center;
      justify-content: center;
      height: 100%;
      white-space: pre-wrap;
      text-align: center;
    `}
  >
    <Constraints.Horizontal max={10}>
      <Spacings.Stack scale="m">
        <div>
          <img src={props.imageSrc} alt={props.label} />
        </div>
        <Text.Headline as="h2">{props.title}</Text.Headline>
        <Text.Body>{props.paragraph1}</Text.Body>
        {props.bodyContent && (
          <div
            css={css`
              display: flex;
              justify-content: center;
            `}
          >
            {props.bodyContent}
          </div>
        )}
        {props.paragraph2 && <Text.Body>{props.paragraph2}</Text.Body>}
      </Spacings.Stack>
    </Constraints.Horizontal>
  </div>
);
MaintenancePageLayout.displayName = 'MaintenancePageLayout';
MaintenancePageLayout.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  label: PropTypes.string,
  title: PropTypes.node.isRequired,
  paragraph1: PropTypes.node.isRequired,
  paragraph2: PropTypes.node,
  bodyContent: PropTypes.node,
};

export default MaintenancePageLayout;
