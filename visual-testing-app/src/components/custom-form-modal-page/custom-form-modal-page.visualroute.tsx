import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { CustomFormModalPage } from '@commercetools-frontend/application-components';
import IconButton from '@commercetools-uikit/icon-button';
import {
  SearchIcon,
  FlameIcon,
  BinLinearIcon,
} from '@commercetools-uikit/icons';
import TextField from '@commercetools-uikit/text-field';
import { CUSTOM_VIEW_LOCATORS } from '../../constants';
import { NestedPages, Suite } from '../../test-utils';

export const routePath = '/custom-form-modal-page';

type ContainerProps = Partial<Parameters<typeof CustomFormModalPage>[0]>;
type FormValues = {
  email: string;
};

const ModalPageWithPortalParentSelector = (props: ContainerProps) => {
  const navigate = useNavigate();
  return (
    <Formik<FormValues>
      initialValues={{ email: '' }}
      onSubmit={() => undefined}
    >
      {(formikProps) => (
        <CustomFormModalPage
          title="Lorem ipsum"
          isOpen
          onClose={() => navigate(routePath)}
          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          {...props}
        >
          <TextField
            name="email"
            title="Email"
            isRequired
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
  );
};
ModalPageWithPortalParentSelector.displayName =
  'ModalPageWithPortalParentSelector';

export const Component = () => (
  <Suite>
    <NestedPages
      title="Custom form modal pages"
      basePath={routePath}
      pages={[
        {
          path: 'custom-form-modal-page-default',
          spec: <ModalPageWithPortalParentSelector />,
        },
        {
          path: 'custom-form-modal-page-default-controls',
          spec: (
            <ModalPageWithPortalParentSelector
              formControls={
                <>
                  <CustomFormModalPage.FormSecondaryButton
                    onClick={() => undefined}
                  />
                  <CustomFormModalPage.FormPrimaryButton
                    onClick={() => undefined}
                  />
                  <CustomFormModalPage.FormDeleteButton
                    onClick={() => undefined}
                  />
                </>
              }
            />
          ),
        },
        {
          path: 'custom-form-modal-page-custom-controls',
          spec: (
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
            />
          ),
        },
        {
          path: 'custom-form-modal-page-hidden-controls',
          spec: (
            <ModalPageWithPortalParentSelector
              formControls={
                <>
                  <CustomFormModalPage.FormSecondaryButton
                    onClick={() => undefined}
                  />
                  <CustomFormModalPage.FormPrimaryButton
                    onClick={() => undefined}
                  />
                  <CustomFormModalPage.FormDeleteButton
                    onClick={() => undefined}
                  />
                </>
              }
              hideControls
            />
          ),
        },
        {
          path: 'custom-form-modal-page-custom-views-selector',
          spec: (
            <ModalPageWithPortalParentSelector
              customViewLocatorCode={CUSTOM_VIEW_LOCATORS.productDetails}
              formControls={
                <>
                  <CustomFormModalPage.FormSecondaryButton
                    onClick={() => undefined}
                  />
                  <CustomFormModalPage.FormPrimaryButton
                    onClick={() => undefined}
                  />
                  <CustomFormModalPage.FormDeleteButton
                    onClick={() => undefined}
                  />
                </>
              }
            />
          ),
        },
      ]}
    />
  </Suite>
);
