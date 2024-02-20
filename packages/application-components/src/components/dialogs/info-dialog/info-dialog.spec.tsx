import { Dispatch, ReactNode, useState } from 'react';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import Spacings from '@commercetools-uikit/spacings';
import { screen, renderComponent, fireEvent } from '../../../test-utils';
import InfoDialog from './info-dialog';

type DialogControllerProps = {
  children: (renderProps: {
    isOpen: boolean;
    setIsOpen: Dispatch<boolean>;
  }) => JSX.Element;
};
const DialogController = (props: DialogControllerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <SecondaryButton
        label="Open Info Dialog"
        onClick={() => setIsOpen(true)}
      />
      {props.children({ isOpen, setIsOpen })}
    </div>
  );
};
DialogController.displayName = 'DialogController';

const CustomTitle = (
  <Spacings.Inset scale="xl">
    <InfoDialog.TextTitle title="Custom Title" />
    <SecondaryButton label="Click me" tone="info" />
  </Spacings.Inset>
);

type TCheckComponentProps = {
  title: ReactNode;
  expectedTitle?: string;
  ariaTitle?: string;
  extraChecks?: () => void;
};
async function checkComponent(params: TCheckComponentProps) {
  renderComponent(
    <DialogController>
      {({ isOpen, setIsOpen }) => (
        <InfoDialog
          title={params.title}
          ariaTitle={params.ariaTitle}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          {'Hello'}
        </InfoDialog>
      )}
    </DialogController>
  );

  const expectedTitle =
    typeof params.title === 'string' ? params.title : params.expectedTitle!;
  const expectedAriaTitle =
    params.ariaTitle ||
    (typeof params.title === 'string' ? expectedTitle : null);

  expect(screen.queryByText(expectedTitle)).not.toBeInTheDocument();

  fireEvent.click(screen.getByLabelText(/Open Info Dialog/));
  await screen.findByText(expectedTitle);
  expect(screen.getByText(/Hello/)).toBeInTheDocument();

  if (expectedAriaTitle) {
    expect(
      screen.getByRole('dialog', { name: expectedAriaTitle })
    ).toBeInTheDocument();
  }

  params.extraChecks?.();

  fireEvent.click(screen.getByLabelText(/Close dialog/));
  expect(screen.queryByText(expectedTitle)).not.toBeInTheDocument();
}

describe('rendering', () => {
  it('should open the modal and close it by clicking on the close button', () =>
    checkComponent({
      title: 'Lorem ipsus',
    }));
});

describe('with custom title', () => {
  beforeEach(() => {
    console.warn = jest.fn();
  });

  it('should render', () =>
    checkComponent({
      title: CustomTitle,
      expectedTitle: 'Custom Title',
      ariaTitle: 'Custom aria title',
      extraChecks: () => {
        expect(
          screen.getByRole('button', { name: /Click me/ })
        ).toBeInTheDocument();
      },
    }));

  it('should render with a warning if no "ariaLabel" is provided', async () =>
    checkComponent({
      title: CustomTitle,
      expectedTitle: 'Custom Title',
      extraChecks: () => {
        expect(
          screen.getByRole('button', { name: /Click me/ })
        ).toBeInTheDocument();
        expect(console.warn).toHaveBeenCalledWith(
          expect.stringContaining(
            `app-kit/DialogHeader: "ariaTitle" prop is required`
          )
        );
      },
    }));
});
