import type { FormEvent } from 'react';
import { Formik } from 'formik';
import { FormDialog } from '@commercetools-frontend/application-components';
import Spacings from '@commercetools-uikit/spacings';
import TextField from '@commercetools-uikit/text-field';
import TextInput from '@commercetools-uikit/text-input';
import LayoutApp from '../layouts/layout-app';
import PlaygroundController from '../components/playground-controller';
import ModalController from '../components/modal-controller';

const FormDialogExample = () => (
  <LayoutApp>
    <PlaygroundController
      knobs={[
        {
          kind: 'text',
          name: 'title',
          label: 'Title',
          initialValue:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          kind: 'select',
          name: 'size',
          label: 'Size',
          valueOptions: [
            { value: 'm', label: 'm' },
            { value: 'l', label: 'l' },
            { value: 'scale', label: 'scale' },
          ],
          initialValue: 'scale',
        },
      ]}
    >
      {({ values }) => (
        <ModalController
          title="Open the Form Dialog by clicking on the button"
          buttonLabel="Open Form Dialog"
        >
          {({ isOpen, setIsOpen }) => (
            <Formik<{ email: string }>
              initialValues={{ email: '' }}
              validate={(formikValues) => {
                if (TextInput.isEmpty(formikValues.email)) {
                  return { email: { missing: true } };
                }
                return {};
              }}
              onSubmit={(formikValues) => {
                alert(`email: ${formikValues.email}`);
                setIsOpen(false);
              }}
            >
              {(formikProps) => (
                <FormDialog
                  title={values.title as string}
                  isOpen={isOpen}
                  onClose={() => setIsOpen(false)}
                  size={values.size as 'm' | 'l' | 'scale'}
                  isPrimaryButtonDisabled={formikProps.isSubmitting}
                  onSecondaryButtonClick={formikProps.handleReset}
                  onPrimaryButtonClick={(event) =>
                    formikProps.handleSubmit(
                      event as FormEvent<HTMLFormElement>
                    )
                  }
                >
                  <Spacings.Stack scale="m">
                    <TextField
                      name="email"
                      title="Email"
                      isRequired={true}
                      value={formikProps.values.email}
                      errors={
                        TextField.toFieldErrors<{ email: string }>(
                          formikProps.errors
                        ).email
                      }
                      touched={formikProps.touched.email}
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                    />
                  </Spacings.Stack>
                </FormDialog>
              )}
            </Formik>
          )}
        </ModalController>
      )}
    </PlaygroundController>
  </LayoutApp>
);
FormDialogExample.displayName = 'FormDialogExample';

export default FormDialogExample;
