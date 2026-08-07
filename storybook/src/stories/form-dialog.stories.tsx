import type { Meta, StoryObj } from '@storybook/react-vite';
import { Formik } from 'formik';
import { FormDialog } from '@commercetools-frontend/application-components';
import Spacings from '@commercetools-uikit/spacings';
import TextField from '@commercetools-uikit/text-field';
import { VisualSpecGroup } from '../helpers';

type TExampleProps = {
  portalId: string;
} & Partial<Parameters<typeof FormDialog>[0]>;
type TFormValues = {
  email: string;
};

// The dialog portals into this target, so it needs an explicit size or nothing is captured.
const FormDialogExample = ({ portalId, ...props }: TExampleProps) => (
  <Formik<TFormValues> initialValues={{ email: '' }} onSubmit={() => undefined}>
    {(formikProps) => (
      <>
        <div
          id={portalId}
          style={{
            position: 'relative',
            width: '100%',
            height: 550,
            overflow: 'hidden',
          }}
        />
        <FormDialog
          title="Lorem ipsum"
          size={props.size}
          isOpen={true}
          onClose={() => undefined}
          onSecondaryButtonClick={() => undefined}
          onPrimaryButtonClick={() => undefined}
          isPrimaryButtonDisabled={props.isPrimaryButtonDisabled}
          getParentSelector={() =>
            document.querySelector(`#${portalId}`) as HTMLElement
          }
          zIndex={10001}
          footerContent={props.footerContent}
        >
          <Spacings.Stack scale="m">
            <TextField
              name="email"
              title="Email"
              isRequired={true}
              value={formikProps.values.email}
              errors={
                TextField.toFieldErrors<TFormValues>(formikProps.errors).email
              }
              touched={formikProps.touched.email}
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
            />
          </Spacings.Stack>
        </FormDialog>
      </>
    )}
  </Formik>
);
FormDialogExample.displayName = 'FormDialogExample';

const meta: Meta<typeof FormDialog> = {
  title: 'Application Components/FormDialog',
  component: FormDialog,
};

export default meta;

type Story = StoryObj<typeof FormDialog>;

export const AllVariants: Story = {
  render: () => (
    <>
      <VisualSpecGroup label="FormDialog - Size M (deprecated)">
        <FormDialogExample size="m" portalId="dialog-m" />
      </VisualSpecGroup>
      <VisualSpecGroup label="FormDialog - Size L (deprecated)">
        <FormDialogExample size="l" portalId="dialog-l" />
      </VisualSpecGroup>
      <VisualSpecGroup label="FormDialog - Size 7">
        <FormDialogExample size={7} portalId="dialog-7" />
      </VisualSpecGroup>
      <VisualSpecGroup label="FormDialog - Size 8">
        <FormDialogExample size={8} portalId="dialog-8" />
      </VisualSpecGroup>
      <VisualSpecGroup label="FormDialog - Size 9">
        <FormDialogExample size={9} portalId="dialog-9" />
      </VisualSpecGroup>
      <VisualSpecGroup label="FormDialog - Size 10">
        <FormDialogExample size={10} portalId="dialog-10" />
      </VisualSpecGroup>
      <VisualSpecGroup label="FormDialog - Size 11">
        <FormDialogExample size={11} portalId="dialog-11" />
      </VisualSpecGroup>
      <VisualSpecGroup label="FormDialog - Size 12">
        <FormDialogExample size={12} portalId="dialog-12" />
      </VisualSpecGroup>
      <VisualSpecGroup label="FormDialog - Size 13">
        <FormDialogExample size={13} portalId="dialog-13" />
      </VisualSpecGroup>
      <VisualSpecGroup label="FormDialog - Size 16">
        <FormDialogExample size={16} portalId="dialog-16" />
      </VisualSpecGroup>
      <VisualSpecGroup label="FormDialog - Size Scale">
        <FormDialogExample size="scale" portalId="dialog-scale" />
      </VisualSpecGroup>
      <VisualSpecGroup label="FormDialog - Default size">
        <FormDialogExample portalId="dialog-default" />
      </VisualSpecGroup>
      <VisualSpecGroup label="FormDialog - Primary button disabled">
        <FormDialogExample
          size="l"
          isPrimaryButtonDisabled={true}
          portalId="dialog-disabled"
        />
      </VisualSpecGroup>
      <VisualSpecGroup label="FormDialog - footerContent provided">
        <FormDialogExample
          size="l"
          portalId="dialog-left-aligned-footer-content"
          footerContent={<a href="/#">{'lorem ipsum'}</a>}
        />
      </VisualSpecGroup>
    </>
  ),
};
