import { Formik } from 'formik';
import TextField from '@commercetools-uikit/text-field';
import { FormModalPage } from '@commercetools-frontend/application-components';
import { Suite, Spec } from '../../test-utils';

export const routePath = '/form-modal-page';

type ContainerProps = {
  portalId: string;
} & Partial<Parameters<typeof FormModalPage>[0]>;
type FormValues = {
  email: string;
};

const ModalPageWithPortalParentSelector = ({
  portalId,
  ...props
}: ContainerProps) => (
  <>
    <div id={portalId} style={{ position: 'relative', height: '750px' }} />
    <Formik<FormValues>
      initialValues={{ email: '' }}
      onSubmit={() => undefined}
    >
      {(formikProps) => (
        <FormModalPage
          title="Lorem ipsum"
          isOpen={true}
          onClose={() => undefined}
          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          onSecondaryButtonClick={() => undefined}
          onPrimaryButtonClick={() => undefined}
          isPrimaryButtonDisabled={props.isPrimaryButtonDisabled}
          isSecondaryButtonDisabled={props.isSecondaryButtonDisabled}
          getParentSelector={() =>
            document.querySelector(`#${portalId}`) as HTMLElement
          }
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
  </>
);
ModalPageWithPortalParentSelector.displayName =
  'ModalPageWithPortalParentSelector';

export const Component = () => (
  <Suite>
    <Spec label="FormModalPage" size="xl">
      <ModalPageWithPortalParentSelector portalId="form-modal-one" />
    </Spec>
    <Spec label="FormModalPage - Primary button disabled" size="xl">
      <ModalPageWithPortalParentSelector
        portalId="form-modal-primary-disabled"
        isPrimaryButtonDisabled
      />
    </Spec>
    <Spec label="FormModalPage - Secondary button disabled" size="xl">
      <ModalPageWithPortalParentSelector
        portalId="form-modal-secondary-disabled"
        isSecondaryButtonDisabled
      />
    </Spec>
    <Spec label="FormModalPage - Long title and subtitle" size="xl">
      <ModalPageWithPortalParentSelector
        portalId="form-modal-long"
        title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        subtitle="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      />
    </Spec>
    <Spec label="FormModalPage - With hidden controls" size="xl">
      <ModalPageWithPortalParentSelector
        hideControls={true}
        portalId="form-modal-hidden-controls"
      />
    </Spec>
  </Suite>
);
