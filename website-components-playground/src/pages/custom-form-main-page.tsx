import type { FormEvent } from 'react';
import { Formik } from 'formik';
import { CustomFormMainPage } from '@commercetools-frontend/application-components';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import TextField from '@commercetools-uikit/text-field';
import TextInput from '@commercetools-uikit/text-input';
import PlaygroundController from '../components/playground-controller';
import LayoutApp from '../layouts/layout-app';

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
    <CustomFormMainPage.PageHeaderTitle
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

const CustomFormMainPageExample = () => {
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
              <CustomFormMainPage
                title={values.title as string}
                subtitle={values.subtitle as string}
                customTitleRow={getCustomTitleRow(
                  values.useCustomTitleRow as string
                )}
                hideControls={Boolean(values.hideControls)}
                formControls={
                  <>
                    <CustomFormMainPage.FormSecondaryButton
                      onClick={formikProps.handleReset}
                    />
                    <CustomFormMainPage.FormPrimaryButton
                      onClick={(event) =>
                        formikProps.handleSubmit(
                          event as FormEvent<HTMLFormElement>
                        )
                      }
                    />
                    <CustomFormMainPage.FormDeleteButton
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
                  errors={
                    TextField.toFieldErrors<{ email: string }>(
                      formikProps.errors
                    ).email
                  }
                  touched={formikProps.touched.email}
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                />
              </CustomFormMainPage>
            )}
          </Formik>
        )}
      </PlaygroundController>
    </LayoutApp>
  );
};
CustomFormMainPageExample.displayName = 'CustomFormMainPageExample';

export default CustomFormMainPageExample;
