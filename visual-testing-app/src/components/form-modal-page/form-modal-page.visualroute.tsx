import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { FormModalPage } from '@commercetools-frontend/application-components';
import TextField from '@commercetools-uikit/text-field';
import { NestedPages, Suite } from '../../test-utils';

export const routePath = '/form-modal-page';

type ContainerProps = Partial<Parameters<typeof FormModalPage>[0]>;
type FormValues = {
  email: string;
};

const ModalPageWithPortalParentSelector = (props: ContainerProps) => {
  const history = useHistory();
  return (
    <Formik<FormValues>
      initialValues={{ email: '' }}
      onSubmit={() => undefined}
    >
      {(formikProps) => (
        <FormModalPage
          title="Lorem ipsum"
          isOpen
          onClose={() => history.push(routePath)}
          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          onSecondaryButtonClick={() => undefined}
          onPrimaryButtonClick={() => undefined}
          isPrimaryButtonDisabled={props.isPrimaryButtonDisabled}
          isSecondaryButtonDisabled={props.isSecondaryButtonDisabled}
          {...props}
        >
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
            horizontalConstraint={7}
          />
        </FormModalPage>
      )}
    </Formik>
  );
};
ModalPageWithPortalParentSelector.displayName =
  'ModalPageWithPortalParentSelector';

export const Component = () => (
  <Suite>
    <NestedPages
      title="Form modal pages"
      basePath={routePath}
      pages={[
        {
          path: 'form-modal-one',
          spec: <ModalPageWithPortalParentSelector />,
        },
        {
          path: 'form-modal-primary-disabled',
          spec: <ModalPageWithPortalParentSelector isPrimaryButtonDisabled />,
        },
        {
          path: 'form-modal-secondary-disabled',
          spec: <ModalPageWithPortalParentSelector isSecondaryButtonDisabled />,
        },
        {
          path: 'form-modal-long',
          spec: (
            <ModalPageWithPortalParentSelector
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              subtitle="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            />
          ),
        },
        {
          path: 'form-modal-hidden-controls',
          spec: <ModalPageWithPortalParentSelector hideControls />,
        },
      ]}
    />
  </Suite>
);
