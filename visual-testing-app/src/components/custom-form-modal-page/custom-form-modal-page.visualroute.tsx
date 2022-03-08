import { Formik } from 'formik';
import {
  SearchIcon,
  FlameIcon,
  BinLinearIcon,
} from '@commercetools-uikit/icons';
import TextField from '@commercetools-uikit/text-field';
import IconButton from '@commercetools-uikit/icon-button';
import { CustomFormModalPage } from '@commercetools-frontend/application-components';
import { Suite, Spec } from '../../test-utils';

export const routePath = '/custom-form-modal-page';

type ContainerProps = {
  portalId: string;
} & Partial<Parameters<typeof CustomFormModalPage>[0]>;
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
        <CustomFormModalPage
          title="Lorem ipsum"
          isOpen={true}
          onClose={() => undefined}
          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
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
        </CustomFormModalPage>
      )}
    </Formik>
  </>
);
ModalPageWithPortalParentSelector.displayName =
  'ModalPageWithPortalParentSelector';

export const Component = () => (
  <Suite>
    <Spec label="CustomFormModalPage" size="xl">
      <ModalPageWithPortalParentSelector portalId="custom-form-modal-page-default"></ModalPageWithPortalParentSelector>
    </Spec>
    <Spec
      label="CustomFormModalPage - with the static exposed form controls"
      size="xl"
    >
      <ModalPageWithPortalParentSelector
        formControls={
          <>
            <CustomFormModalPage.FormSecondaryButton
              onClick={() => undefined}
            />
            <CustomFormModalPage.FormPrimaryButton onClick={() => undefined} />
            <CustomFormModalPage.FormDeleteButton onClick={() => undefined} />
          </>
        }
        portalId="custom-form-modal-page-default-controls"
      />
    </Spec>
    <Spec label="CustomFormModalPage - with other custom controls" size="xl">
      <ModalPageWithPortalParentSelector
        formControls={
          <>
            <IconButton
              label="Search"
              icon={<SearchIcon />}
              onClick={() => undefined}
            />
            <IconButton
              label="Update"
              icon={<FlameIcon />}
              onClick={() => undefined}
            />
            <IconButton
              label="Delete"
              icon={<BinLinearIcon />}
              onClick={() => undefined}
            />
          </>
        }
        portalId="custom-form-modal-page-custom-controls"
      ></ModalPageWithPortalParentSelector>
    </Spec>
    <Spec label="CustomFormModalPage - with hidden controls" size="xl">
      <ModalPageWithPortalParentSelector
        formControls={
          <>
            <CustomFormModalPage.FormSecondaryButton
              onClick={() => undefined}
            />
            <CustomFormModalPage.FormPrimaryButton onClick={() => undefined} />
            <CustomFormModalPage.FormDeleteButton onClick={() => undefined} />
          </>
        }
        hideControls={true}
        portalId="custom-form-modal-page-hidden-controls"
      ></ModalPageWithPortalParentSelector>
    </Spec>
  </Suite>
);
