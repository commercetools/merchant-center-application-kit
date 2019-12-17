import React from 'react';
import { Formik } from 'formik';
import TextField, { CustomFormikErrors } from '@commercetools-uikit/text-field';
import Spacings from '@commercetools-uikit/spacings';
import { FormDialog } from '@commercetools-frontend/application-components';
import { Suite, Spec } from '../../test-utils';

export const routePath = '/form-dialog';

type ContainerProps = {
  portalId: string;
} & Partial<Parameters<typeof FormDialog>[0]>;
type FormValues = {
  email: string;
};

const FormDialogExample = (props: ContainerProps) => (
  <Formik<FormValues> initialValues={{ email: '' }} onSubmit={() => undefined}>
    {formikProps => (
      <React.Fragment>
        <div id={props.portalId} style={{ flex: 1 }} />
        <FormDialog
          title="Lorem ipsum"
          size={props.size}
          isOpen={true}
          onClose={() => undefined}
          onSecondaryButtonClick={() => undefined}
          onPrimaryButtonClick={() => undefined}
          isPrimaryButtonDisabled={props.isPrimaryButtonDisabled}
          getParentSelector={() =>
            document.querySelector(`#${props.portalId}`) as HTMLElement
          }
        >
          <Spacings.Stack scale="m">
            <TextField
              name="email"
              title="Email"
              isRequired={true}
              value={formikProps.values.email}
              errors={
                (formikProps.errors as CustomFormikErrors<FormValues>).email
              }
              touched={formikProps.touched.email}
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
            />
          </Spacings.Stack>
        </FormDialog>
      </React.Fragment>
    )}
  </Formik>
);
FormDialogExample.displayName = 'FormDialogExample';

export const Component = () => (
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
  </Suite>
);
