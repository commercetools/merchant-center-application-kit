import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { Constraints, Text, Spacings } from '@commercetools-frontend/ui-kit';
import deprecateComponent from '../../utils/deprecate-component';

const MaintenancePageLayout = props => (
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
    <Constraints.Horizontal constraint="l">
      <Spacings.Stack scale="m">
        <div>
          <img src={props.imageSrc} />
        </div>
        <Text.Headline elementType="h2">{props.title}</Text.Headline>
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
  title: PropTypes.node.isRequired,
  paragraph1: PropTypes.node.isRequired,
  paragraph2: PropTypes.node,
  bodyContent: PropTypes.node,
};

export default MaintenancePageLayout;

const ServicePageResponseLayout = MaintenancePageLayout;
ServicePageResponseLayout.displayName = 'ServicePageResponseLayout';
export const DeprecatedServicePageResponseLayout = deprecateComponent({
  message: `The "ServicePageResponseLayout" component has been renamed to "MaintenancePageLayout". The named export will be removed in the next major release.`,
})(ServicePageResponseLayout);
