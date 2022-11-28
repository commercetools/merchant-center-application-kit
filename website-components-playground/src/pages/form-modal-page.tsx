import type { FormEvent } from 'react';
import { Formik } from 'formik';
import { FormModalPage } from '@commercetools-frontend/application-components';
import TextInput from '@commercetools-uikit/text-input';
import TextField from '@commercetools-uikit/text-field';
import LayoutApp from '../layouts/layout-app';
import PlaygroundController from '../components/playground-controller';
import ModalController from '../components/modal-controller';

const containerId = 'form-modal-page';

const FormModalPageExample = () => (
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
          kind: 'text',
          name: 'subtitle',
          label: 'Subtitle',
          initialValue:
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
          kind: 'text',
          name: 'labelPrimaryButton',
          label: 'Label Primary Button',
          initialValue: 'Confirm',
        },
        {
          kind: 'text',
          name: 'labelSecondaryButton',
          label: 'Label Secondary Button',
          initialValue: 'Cancel',
        },
        {
          kind: 'select',
          name: 'hideControls',
          label: 'Hide Controls?',
          valueOptions: [
            { value: 'false', label: 'No' },
            { value: 'true', label: 'Yes' },
          ],
          initialValue: 'false',
        },
      ]}
    >
      {({ values }) => (
        <ModalController
          title="Open the Form Modal Page by clicking on the button"
          buttonLabel="Open Form Modal Page"
          containerId={containerId}
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
                <FormModalPage
                  title={values.title as string}
                  subtitle={values.subtitle as string}
                  isOpen={isOpen}
                  onClose={() => setIsOpen(false)}
                  isPrimaryButtonDisabled={formikProps.isSubmitting}
                  isSecondaryButtonDisabled={formikProps.isSubmitting}
                  labelSecondaryButton={values.labelSecondaryButton as string}
                  labelPrimaryButton={values.labelPrimaryButton as string}
                  onSecondaryButtonClick={formikProps.handleReset}
                  onPrimaryButtonClick={(event) =>
                    formikProps.handleSubmit(
                      event as FormEvent<HTMLFormElement>
                    )
                  }
                  getParentSelector={() =>
                    document.querySelector(`#${containerId}`) as HTMLElement
                  }
                  hideControls={Boolean(values.hideControls)}
                >
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
                </FormModalPage>
              )}
            </Formik>
          )}
        </ModalController>
      )}
    </PlaygroundController>
  </LayoutApp>
);

FormModalPageExample.displayName = 'FormModalPageExample';

export default FormModalPageExample;
