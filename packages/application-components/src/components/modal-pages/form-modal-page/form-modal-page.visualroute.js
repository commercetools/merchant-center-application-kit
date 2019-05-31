import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { TextField } from '@commercetools-frontend/ui-kit';
import { FormModalPage } from 'application-components';
import { Suite, Spec } from '../../../../test-utils/visual';

export const routePath = '/form-modal-page';

const ModalPageWithPortalParentSelector = ({ portalId, ...props }) => (
  <React.Fragment>
    <div
      id={portalId}
      style={{
        position: 'relative',
        height: '750px',
      }}
    />
    <Formik
      initialValues={{ email: '' }}
      onSubmit={() => {}}
      render={formikProps => (
        <FormModalPage
          title="Lorem ipsum"
          isOpen={true}
          onClose={() => {}}
          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          onSecondaryButtonClick={() => {}}
          onPrimaryButtonClick={() => {}}
          isPrimaryButtonDisabled={props.isPrimaryButtonDisabled}
          parentSelector={() => document.querySelector(`#${portalId}`)}
          {...props}
        >
          <TextField
            name="email"
            title="Email"
            isRequired={true}
            value={formikProps.values.email}
            errors={formikProps.errors.email}
            touched={formikProps.touched.email}
            onChange={formikProps.handleChange}
            onBlur={formikProps.handleBlur}
            onFocus={formikProps.handleFocus}
            horizontalConstraint="m"
          />
        </FormModalPage>
      )}
    />
  </React.Fragment>
);
ModalPageWithPortalParentSelector.displayName =
  'ModalPageWithPortalParentSelector';
ModalPageWithPortalParentSelector.propTypes = {
  isPrimaryButtonDisabled: PropTypes.bool,
  portalId: PropTypes.string.isRequired,
};

export const component = () => (
  <Suite>
    <Spec label="FormModalPage" size="xl">
      <ModalPageWithPortalParentSelector portalId="form-modal-one" />
    </Spec>
    <Spec label="FormModalPage - Primary button disabled" size="xl">
      <ModalPageWithPortalParentSelector
        portalId="form-modal-disabled"
        isPrimaryButtonDisabled
      />
    </Spec>
  </Suite>
);
