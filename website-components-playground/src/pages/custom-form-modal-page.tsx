import type { FormEvent } from 'react';
import { Formik } from 'formik';
import { CustomFormModalPage } from '@commercetools-frontend/application-components';
import TextInput from '@commercetools-uikit/text-input';
import TextField from '@commercetools-uikit/text-field';
import LayoutApp from '../layouts/layout-app';
import PlaygroundController from '../components/playground-controller';
import ModalController from '../components/modal-controller';

const containerId = 'custom-form-modal-page';

const CustomFormModalPageExample = () => (
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
          title="Open the Custom Form Modal Page by clicking on the button"
          buttonLabel="Open Custom Form Modal Page"
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
                <CustomFormModalPage
                  title={values.title as string}
                  subtitle={values.subtitle as string}
                  isOpen={isOpen}
                  onClose={() => setIsOpen(false)}
                  formControls={
                    <>
                      <CustomFormModalPage.FormSecondaryButton
                        onClick={formikProps.handleReset}
                      />
                      <CustomFormModalPage.FormPrimaryButton
                        onClick={(event) =>
                          formikProps.handleSubmit(
                            event as FormEvent<HTMLFormElement>
                          )
                        }
                      />
                      <CustomFormModalPage.FormDeleteButton
                        onClick={() => null}
                        isDisabled={true}
                      />
                    </>
                  }
                  hideControls={Boolean(values.hideControls)}
                  getParentSelector={() =>
                    document.querySelector(`#${containerId}`) as HTMLElement
                  }
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
                </CustomFormModalPage>
              )}
            </Formik>
          )}
        </ModalController>
      )}
    </PlaygroundController>
  </LayoutApp>
);

CustomFormModalPageExample.displayName = 'CustomFormModalPageExample';

export default CustomFormModalPageExample;
