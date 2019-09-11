import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  FlameIcon,
  IconButton,
  SearchIcon,
  BinLinearIcon,
  TextField,
} from '@commercetools-frontend/ui-kit';
import { CustomFormModalPage } from '@local-build/application-components';
import { Suite, Spec } from '../../../../../../visual-testing-app/test-utils';

export const routePath = '/custom-form-modal-page';

const ModalPageWithPortalParentSelector = ({ portalId, ...remainingProps }) => (
  <React.Fragment>
    <div id={portalId} style={{ position: 'relative', height: '750px' }} />
    <Formik
      initialValues={{ email: '' }}
      onSubmit={() => {}}
      render={formikProps => (
        <CustomFormModalPage
          title="Lorem ipsum"
          isOpen={true}
          onClose={() => {}}
          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          getParentSelector={() => document.querySelector(`#${portalId}`)}
          {...remainingProps}
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
        </CustomFormModalPage>
      )}
    />
  </React.Fragment>
);
ModalPageWithPortalParentSelector.displayName =
  'ModalPageWithPortalParentSelector';
ModalPageWithPortalParentSelector.propTypes = {
  portalId: PropTypes.string.isRequired,
};

export const component = () => (
  <Suite>
    <Spec label="CustomFormModalPage" size="xl">
      <ModalPageWithPortalParentSelector portalId="custom-form-modal-page-default"></ModalPageWithPortalParentSelector>
    </Spec>
    <Spec
      label="CustomFormModalPage - with the static exposed form controls"
      size="xl"
      formControls={
        <React.Fragment>
          <CustomFormModalPage.FormSecondaryButton onClick={() => {}} />
          <CustomFormModalPage.FormPrimaryButton onClick={() => {}} />
          <CustomFormModalPage.FormDeleteButton onClick={() => {}} />
        </React.Fragment>
      }
    >
      <ModalPageWithPortalParentSelector portalId="custom-form-modal-page-default-controls" />
    </Spec>
    <Spec label="CustomFormModalPage - with other custom controls" size="xl">
      <ModalPageWithPortalParentSelector
        formControls={
          <React.Fragment>
            <IconButton icon={<SearchIcon />} onClick={() => {}} />
            <IconButton icon={<FlameIcon />} onClick={() => {}} />
            <IconButton icon={<BinLinearIcon />} onClick={() => {}} />
          </React.Fragment>
        }
        portalId="custom-form-modal-page-custom-controls"
      ></ModalPageWithPortalParentSelector>
    </Spec>
    <Spec label="CustomFormModalPage - with hidden controls" size="xl">
      <ModalPageWithPortalParentSelector
        formControls={
          <React.Fragment>
            <CustomFormModalPage.FormSecondaryButton onClick={() => {}} />
            <CustomFormModalPage.FormPrimaryButton onClick={() => {}} />
            <CustomFormModalPage.FormDeleteButton onClick={() => {}} />
          </React.Fragment>
        }
        hideControls={true}
        portalId="custom-form-modal-page-hidden-controls"
      ></ModalPageWithPortalParentSelector>
    </Spec>
  </Suite>
);
