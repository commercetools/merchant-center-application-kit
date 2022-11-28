import type { FormEvent } from 'react';
import { Formik } from 'formik';
import { FormDetailPage } from '@commercetools-frontend/application-components';
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
    <FormDetailPage.PageHeaderTitle
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

const getCustomTitleRow = (useCustomTitleRow: string) => {
  switch (useCustomTitleRow) {
    case 'custom-form':
      return exampleCustomTitleRow;
    case 'custom-title-and-side-content':
      return exampleCustomTitleRowWithTitleAndSideContent;
    default:
      return null;
  }
};

const FormDetailPageExample = () => {
  return (
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
            }}
          >
            {(formikProps) => (
              <FormDetailPage
                title={values.title as string}
                subtitle={values.subtitle as string}
                onPreviousPathClick={() => alert('Go back clicked')}
                customTitleRow={getCustomTitleRow(
                  values.useCustomTitleRow as string
                )}
                isPrimaryButtonDisabled={formikProps.isSubmitting}
                isSecondaryButtonDisabled={formikProps.isSubmitting}
                labelSecondaryButton={values.labelSecondaryButton as string}
                labelPrimaryButton={values.labelPrimaryButton as string}
                onSecondaryButtonClick={formikProps.handleReset}
                onPrimaryButtonClick={(event) =>
                  formikProps.handleSubmit(event as FormEvent<HTMLFormElement>)
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
              </FormDetailPage>
            )}
          </Formik>
        )}
      </PlaygroundController>
    </LayoutApp>
  );
};
FormDetailPageExample.displayName = 'FormDetailPageExample';

export default FormDetailPageExample;
