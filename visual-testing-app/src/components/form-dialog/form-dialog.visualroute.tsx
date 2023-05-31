import { Formik } from 'formik';
import { FormDialog } from '@commercetools-frontend/application-components';
import Spacings from '@commercetools-uikit/spacings';
import TextField from '@commercetools-uikit/text-field';
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
    {(formikProps) => (
      <>
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
          zIndex={10001}
        >
          <Spacings.Stack scale="m">
            <TextField
              name="email"
              title="Email"
              isRequired={true}
              value={formikProps.values.email}
              errors={
                TextField.toFieldErrors<FormValues>(formikProps.errors).email
              }
              touched={formikProps.touched.email}
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
            />
          </Spacings.Stack>
        </FormDialog>
      </>
    )}
  </Formik>
);
FormDialogExample.displayName = 'FormDialogExample';

export const Component = () => (
  <Suite>
    <Spec
      label="FormDialog - Size M (deprecated)"
      size="l"
      contentAlignment="center"
    >
      <FormDialogExample size="m" portalId="dialog-m" />
    </Spec>
    <Spec
      label="FormDialog - Size L (deprecated)"
      size="l"
      contentAlignment="center"
    >
      <FormDialogExample size="l" portalId="dialog-l" />
    </Spec>
    <Spec label="FormDialog - Size 7" size={7} contentAlignment="center">
      <FormDialogExample size={7} portalId="dialog-7" />
    </Spec>
    <Spec label="FormDialog - Size 8" size={8} contentAlignment="center">
      <FormDialogExample size={7} portalId="dialog-8" />
    </Spec>
    <Spec label="FormDialog - Size 9" size={9} contentAlignment="center">
      <FormDialogExample size={9} portalId="dialog-9" />
    </Spec>
    <Spec label="FormDialog - Size 10" size={10} contentAlignment="center">
      <FormDialogExample size={10} portalId="dialog-10" />
    </Spec>
    <Spec label="FormDialog - Size 11" size={11} contentAlignment="center">
      <FormDialogExample size={11} portalId="dialog-11" />
    </Spec>
    <Spec label="FormDialog - Size 12" size={12} contentAlignment="center">
      <FormDialogExample size={12} portalId="dialog-12" />
    </Spec>
    <Spec label="FormDialog - Size 13" size={13} contentAlignment="center">
      <FormDialogExample size={13} portalId="dialog-13" />
    </Spec>
    <Spec label="FormDialog - Size Scale" size="l" contentAlignment="center">
      <FormDialogExample size="scale" portalId="dialog-scale" />
    </Spec>
    <Spec label="FormDialog - Size xl" size="l" contentAlignment="center">
      <FormDialogExample size="xl" portalId="dialog-xl" />
    </Spec>
    <Spec label="FormDialog - Default size" contentAlignment="center">
      <FormDialogExample portalId="dialog-default" />
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
