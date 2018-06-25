import React from 'react';
import PropTypes from 'prop-types';
import Text from '@commercetools-frontend/ui-kit/typography/text';
import styles from './service-page-response-layout.mod.css';

const ServicePageResponseLayout = props => (
  <div className={styles.container}>
    <div className={styles.content}>
      <div>
        <img src={props.imageSrc} className={styles.graphic} />
      </div>
      <Text.Headline elementType="h2">{props.title}</Text.Headline>
      <Text.Body>{props.paragraph1}</Text.Body>
      {props.bodyContent && (
        <div className={styles.body}>{props.bodyContent}</div>
      )}
      {props.paragraph2 && <Text.Body>{props.paragraph2}</Text.Body>}
    </div>
  </div>
);
ServicePageResponseLayout.displayName = 'ServicePageResponseLayout';
ServicePageResponseLayout.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  paragraph1: PropTypes.node.isRequired,
  paragraph2: PropTypes.node,
  bodyContent: PropTypes.node,
};

export default ServicePageResponseLayout;
