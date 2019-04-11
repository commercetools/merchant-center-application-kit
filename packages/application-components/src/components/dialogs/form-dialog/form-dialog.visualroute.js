import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Spacings,
  TextField,
  SelectField,
} from '@commercetools-frontend/ui-kit';
import { FormDialog } from 'application-components';
import { Suite, Spec } from '../../../../test-utils/visual';

export const routePath = '/form-dialog';

const FormDialogExample = props => (
  <Formik
    initialValues={{ email: '' }}
    onSubmit={() => {}}
    render={formikProps => (
      <React.Fragment>
        <div id={props.portalId} style={{ flex: 1 }} />
        <FormDialog
          title="Lorem ipsum"
          size={props.size}
          isOpen={true}
          onClose={() => {}}
          onSecondaryButtonClick={() => {}}
          onPrimaryButtonClick={() => {}}
          isPrimaryButtonDisabled={props.isPrimaryButtonDisabled}
          getParentSelector={() => document.querySelector(`#${props.portalId}`)}
        >
          <Spacings.Stack scale="m">
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
            />
          </Spacings.Stack>
        </FormDialog>
      </React.Fragment>
    )}
  />
);
FormDialogExample.displayName = 'FormDialogExample';
FormDialogExample.propTypes = {
  size: PropTypes.oneOf(['m', 'l', 'scale']).isRequired,
  isPrimaryButtonDisabled: PropTypes.bool,
  portalId: PropTypes.string.isRequired,
};

const options = [
  { value: 'daft punk', label: 'Daft Punk' },
  { value: 'lcd soundsystem', label: 'LCD Soundsystem' },
  { value: 'the cure', label: 'The Cure' },
];

const FormDialogOverflowExample = props => (
  <Formik
    initialValues={{
      email: '',
      favoriteBand: 'daft punk',
    }}
    onSubmit={() => {}}
    render={formikProps => (
      <React.Fragment>
        <div id={props.portalId} style={{ flex: 1 }} />
        <FormDialog
          title="Lorem ipsum"
          size={props.size}
          isOpen={true}
          onClose={() => {}}
          onSecondaryButtonClick={() => {}}
          onPrimaryButtonClick={() => {}}
          isPrimaryButtonDisabled={false}
          getParentSelector={() => document.querySelector(`#${props.portalId}`)}
        >
          <Spacings.Stack scale="m">
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
            />
            <SelectField
              id="select-input"
              name="favoriteBand"
              title="Favorite Band"
              isRequired={true}
              options={options}
              value={formikProps.values.favoriteBand}
              errors={formikProps.errors.favoriteBand}
              touched={formikProps.touched.favoriteBand}
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
              onFocus={formikProps.handleFocus}
            />
          </Spacings.Stack>
        </FormDialog>
      </React.Fragment>
    )}
  />
);
FormDialogOverflowExample.displayName = 'FormDialogOverflowExample';
FormDialogOverflowExample.propTypes = {
  size: PropTypes.oneOf(['m', 'l', 'scale']).isRequired,
  portalId: PropTypes.string.isRequired,
};

export const component = () => (
  <Suite>
    <Spec label="FormDialog - Size M" size="l" contentAlignment="center">
      <FormDialogExample size="m" portalId="dialog-m" />
    </Spec>
    <Spec label="FormDialog - Size L" size="l" contentAlignment="center">
      <FormDialogExample size="l" portalId="dialog-l" />
    </Spec>
    <Spec label="FormDialog - Size Scale" size="l" contentAlignment="center">
      <FormDialogExample size="scale" portalId="dialog-scale" />
    </Spec>
    <Spec
      label="FormDialog - Primary button disabled"
      size="l"
      contentAlignment="center"
    >
      <FormDialogExample
        size="l"
        isPrimaryButtonDisabled={true}
        portalId="dialog-disabled"
      />
    </Spec>
    <Spec label="FormDialog - another" size="l" contentAlignment="center">
      <FormDialogOverflowExample size="m" portalId="dialog-overflow" />
    </Spec>
  </Suite>
);
