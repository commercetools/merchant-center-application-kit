import { Formik } from 'formik';
import { CustomFormDetailPage } from '@commercetools-frontend/application-components';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import TextInput from '@commercetools-uikit/text-input';
import TextField from '@commercetools-uikit/text-field';
import LayoutApp from '../layouts/layout-app';
import PlaygroundController from '../components/playground-controller';

const exampleCustomTitleRow = (
  <Spacings.Inline scale="m">
    <Spacings.Inline alignItems="center">
      <label htmlFor="input-1">
        <Text.Body isBold truncate>
          Input 1
        </Text.Body>
      </label>
      <TextInput id="input-1" value="" onChange={() => undefined} />
    </Spacings.Inline>

    <Spacings.Inline alignItems="center">
      <label htmlFor="input-2">
        <Text.Body isBold truncate>
          Input 2
        </Text.Body>
      </label>
      <TextInput id="input-2" value="" onChange={() => undefined} />
    </Spacings.Inline>
  </Spacings.Inline>
);

const exampleCustomTitleRowWithTitleAndSideContent = (
  <Spacings.Inline scale="m" justifyContent="space-between">
    <CustomFormDetailPage.PageHeaderTitle
      title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      titleSize="big"
    />
    <Spacings.Inline alignItems="center">
      <Text.Body isBold truncate>
        Lorem ipsum dolor sit amet.
      </Text.Body>
    </Spacings.Inline>
  </Spacings.Inline>
);

const getCustomTitleRow = (useCustomTitleRow) => {
  switch (useCustomTitleRow) {
    case 'custom-form':
      return exampleCustomTitleRow;
    case 'custom-title-and-side-content':
      return exampleCustomTitleRowWithTitleAndSideContent;
    default:
      break;
  }
};

const CustomFormDetailPageExample = (props) => {
  return (
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
            kind: 'text',
            name: 'subtitle',
            label: 'Subtitle',
            initialValue:
              'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          },
          {
            kind: 'select',
            name: 'useCustomTitleRow',
            label: 'Title Row',
            valueOptions: [
              { value: 'default', label: 'Default' },
              { value: 'custom-form', label: 'Custom (form example)' },
              {
                value: 'custom-title-and-side-content',
                label: 'Custom (title and side content example)',
              },
            ],
            initialValue: 'default',
          },
          {
            kind: 'select',
            name: 'hideControls',
            label: 'Hide Controls?',
            valueOptions: [
              { value: false, label: 'No' },
              { value: true, label: 'Yes' },
            ],
            initialValue: false,
          },
          {
            kind: 'select',
            name: 'onPreviousPathClick',
            label: 'onPreviousPathClick',
            valueOptions: [
              { value: undefined, label: 'undefined' },
              {
                value: () => alert('Go back clicked'),
                label: 'Pass a click event handler',
              },
            ],
            initialValue: () => alert('Go back clicked'),
          },
        ]}
      >
        {({ values }) => (
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
            }}
            render={(formikProps) => (
              <CustomFormDetailPage
                title={values.title}
                subtitle={values.subtitle}
                customTitleRow={getCustomTitleRow(values.useCustomTitleRow)}
                onPreviousPathClick={values.onPreviousPathClick}
                hideControls={values.hideControls}
                formControls={
                  <>
                    <CustomFormDetailPage.FormSecondaryButton
                      onClick={() => {
                        formikProps.resetForm();
                      }}
                    />
                    <CustomFormDetailPage.FormPrimaryButton
                      onClick={formikProps.handleSubmit}
                    />
                    <CustomFormDetailPage.FormDeleteButton
                      onClick={() => null}
                      isDisabled={true}
                    />
                  </>
                }
              >
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
              </CustomFormDetailPage>
            )}
          />
        )}
      </PlaygroundController>
    </LayoutApp>
  );
};
CustomFormDetailPageExample.displayName = 'CustomFormDetailPageExample';

export default CustomFormDetailPageExample;
