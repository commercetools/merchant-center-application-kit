import React from 'react';
import PropTypes from 'prop-types';
import { Constraints, Text, Spacings } from '@commercetools-frontend/ui-kit';
import deprecateComponent from '../../utils/deprecate-component';
import styles from './maintenance-page-layout.mod.css';

const MaintenancePageLayout = props => (
  <div className={styles.container}>
    <Constraints.Horizontal constraint="l">
      <Spacings.Stack scale="m">
        <div>
          <img src={props.imageSrc} />
        </div>
        <div>
          <Text.Headline elementType="h2">{props.title}</Text.Headline>
        </div>
        <div>
          <Text.Body>{props.paragraph1}</Text.Body>
        </div>
        {props.bodyContent && (
          <div className={styles.body}>{props.bodyContent}</div>
        )}
        {props.paragraph2 && (
          <div>
            <Text.Body>{props.paragraph2}</Text.Body>
          </div>
        )}
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
