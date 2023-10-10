import { Formik } from 'formik';
import { FormDetailPage } from '@commercetools-frontend/application-components';
import TextField from '@commercetools-uikit/text-field';
import { CUSTOM_VIEW_LOCATORS } from '../../constants';
import { Suite, Spec } from '../../test-utils';

export const routePath = '/form-detail-page';

type ContainerProps = Partial<Parameters<typeof FormDetailPage>[0]>;
type FormValues = {
  email: string;
};

const DetailPageContainer = (props: ContainerProps) => (
  <div style={{ position: 'relative', height: '750px' }}>
    <Formik<FormValues>
      initialValues={{ email: '' }}
      onSubmit={() => undefined}
    >
      {(formikProps) => (
        <FormDetailPage
          title="Lorem ipsum"
          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          onSecondaryButtonClick={() => undefined}
          onPrimaryButtonClick={() => undefined}
          isPrimaryButtonDisabled={props.isPrimaryButtonDisabled}
          isSecondaryButtonDisabled={props.isSecondaryButtonDisabled}
          onPreviousPathClick={() => alert('Go back clicked')}
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
        </FormDetailPage>
      )}
    </Formik>
  </div>
);
DetailPageContainer.displayName = 'DetailPageContainer';

export const Component = () => (
  <Suite>
    <Spec label="FormDetailPage" size="xl">
      <DetailPageContainer />
    </Spec>
    <Spec label="FormDetailPage - Primary button disabled" size="xl">
      <DetailPageContainer isPrimaryButtonDisabled />
    </Spec>
    <Spec label="FormDetailPage - Secondary button disabled" size="xl">
      <DetailPageContainer isSecondaryButtonDisabled />
    </Spec>
    <Spec label="FormDetailPage - Long title and subtitle" size="xl">
      <DetailPageContainer
        title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        subtitle="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      />
    </Spec>
    <Spec label="FormDetailPage - With hidden controls" size="xl">
      <DetailPageContainer hideControls={true} />
    </Spec>
    <Spec label="FormDetailPage = With Custom Views selector" size="xl">
      <DetailPageContainer
        customViewLocatorCode={CUSTOM_VIEW_LOCATORS.productDetails}
      />
    </Spec>
  </Suite>
);
