import { Formik, type FormikValues } from 'formik';
import TextField from '@commercetools-uikit/text-field';
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
type CustomFormikErrorsField = {
  [errorKey: string]: boolean; // <-- our ui-kit components use a boolean flag to indicate the error
};
type CustomFormikErrors<Values = FormikValues> = {
  [K in keyof Values]?: CustomFormikErrorsField;
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
      </>
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
