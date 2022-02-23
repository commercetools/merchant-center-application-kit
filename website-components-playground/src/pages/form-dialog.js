import { Formik } from 'formik';
import { FormDialog } from '@commercetools-frontend/application-components';
import Spacings from '@commercetools-uikit/spacings';
import TextField from '@commercetools-uikit/text-field';
import TextInput from '@commercetools-uikit/text-input';
import LayoutApp from '../layouts/layout-app';
import PlaygroundController from '../components/playground-controller';
import ModalController from '../components/modal-controller';

const containerId = 'form-dialog';

const FormDialogExample = (props) => (
  <LayoutApp>
    <PlaygroundController
      // eslint-disable-next-line react/prop-types
      {...props.pageContext}
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
          containerId={containerId}
          title="Open the Form Dialog by clicking on the button"
          buttonLabel="Open Form Dialog"
        >
          {({ isOpen, setIsOpen }) => (
            <Formik
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
              render={(formikProps) => (
                <FormDialog
                  title={values.title}
                  isOpen={isOpen}
                  onClose={() => setIsOpen(false)}
                  size={values.size}
                  isPrimaryButtonDisabled={formikProps.isSubmitting}
                  onSecondaryButtonClick={() => {
                    formikProps.resetForm();
                    setIsOpen(false);
                  }}
                  onPrimaryButtonClick={formikProps.handleSubmit}
                  getParentSelector={() =>
                    document.querySelector(`#${containerId}`)
                  }
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
                    />
                  </Spacings.Stack>
                </FormDialog>
              )}
            />
          )}
        </ModalController>
      )}
    </PlaygroundController>
  </LayoutApp>
);
FormDialogExample.displayName = 'FormDialogExample';

export default FormDialogExample;
