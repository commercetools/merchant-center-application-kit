import { Formik } from 'formik';
import {
  SearchIcon,
  FlameIcon,
  BinLinearIcon,
} from '@commercetools-uikit/icons';
import TextField from '@commercetools-uikit/text-field';
import IconButton from '@commercetools-uikit/icon-button';
import { CustomFormDetailPage } from '@commercetools-frontend/application-components';
import { Suite, Spec } from '../../test-utils';

export const routePath = '/custom-form-detail-page';

type ContainerProps = Partial<Parameters<typeof CustomFormDetailPage>[0]>;
type FormValues = {
  email: string;
};

const CustomFormDetailPageContainer = (props: ContainerProps) => (
  <div style={{ position: 'relative', height: '750px' }}>
    <Formik<FormValues>
      initialValues={{ email: '' }}
      onSubmit={() => undefined}
    >
      {(formikProps) => (
        <CustomFormDetailPage
          title="Lorem ipsum"
          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
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
        </CustomFormDetailPage>
      )}
    </Formik>
  </div>
);
CustomFormDetailPageContainer.displayName = 'CustomFormDetailPageContainer';

export const Component = () => (
  <Suite>
    <Spec label="CustomFormDetailPage" size="xl">
      <CustomFormDetailPageContainer />
    </Spec>
    <Spec
      label="CustomFormDetailPage - with the static exposed form controls"
      size="xl"
    >
      <CustomFormDetailPageContainer
        formControls={
          <>
            <CustomFormDetailPage.FormSecondaryButton
              onClick={() => undefined}
            />
            <CustomFormDetailPage.FormPrimaryButton onClick={() => undefined} />
            <CustomFormDetailPage.FormDeleteButton onClick={() => undefined} />
          </>
        }
      />
    </Spec>
    <Spec label="CustomFormDetailPage - with other custom controls" size="xl">
      <CustomFormDetailPageContainer
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
    </Spec>
    <Spec label="CustomFormDetailPage - with hidden controls" size="xl">
      <CustomFormDetailPageContainer
        formControls={
          <>
            <CustomFormDetailPage.FormSecondaryButton
              onClick={() => undefined}
            />
            <CustomFormDetailPage.FormPrimaryButton onClick={() => undefined} />
            <CustomFormDetailPage.FormDeleteButton onClick={() => undefined} />
          </>
        }
        hideControls={true}
      />
    </Spec>
    <Spec label="CustomFormDetailPage - long title and subtitle" size="xl">
      <CustomFormDetailPageContainer
        title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        subtitle="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        formControls={
          <>
            <CustomFormDetailPage.FormSecondaryButton
              onClick={() => undefined}
            />
            <CustomFormDetailPage.FormPrimaryButton onClick={() => undefined} />
            <CustomFormDetailPage.FormDeleteButton onClick={() => undefined} />
          </>
        }
      />
    </Spec>
    <Spec label="CustomFormDetailPage - with top bar" size="xl">
      <CustomFormDetailPageContainer
        showPageTopBar
        onPreviousPathClick={() => alert('Go back clicked')}
        formControls={
          <>
            <CustomFormDetailPage.FormSecondaryButton
              onClick={() => undefined}
            />
            <CustomFormDetailPage.FormPrimaryButton onClick={() => undefined} />
            <CustomFormDetailPage.FormDeleteButton onClick={() => undefined} />
          </>
        }
      />
    </Spec>
  </Suite>
);
