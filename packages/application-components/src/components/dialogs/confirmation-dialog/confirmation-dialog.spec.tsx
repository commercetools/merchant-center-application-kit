import { screen, fireEvent } from '../../../test-utils';
import {
  DialogCustomTitle,
  TDialogComponentValidator,
  createDialogValidator,
} from '../internals/dialog-test-utils';
import ConfirmationDialog from './confirmation-dialog';

const createConfirmationDialogValidator = () => {
  const onCancel = jest.fn();
  const onConfirm = jest.fn();

  return createDialogValidator({
    component: ConfirmationDialog,
    extraProps: {
      onCancel,
      onConfirm,
    },
    extraChecks: () => {
      fireEvent.click(screen.getByLabelText('Cancel'));
      expect(onCancel).toHaveBeenCalled();
      fireEvent.click(screen.getByLabelText('Confirm'));
      expect(onConfirm).toHaveBeenCalled();
    },
  });
};

describe('rendering', () => {
  let validateComponent: TDialogComponentValidator;

  beforeEach(() => {
    validateComponent = createConfirmationDialogValidator();
  });

  it('should open the modal and close it by clicking on the close button', () =>
    validateComponent({
      title: 'Lorem ipsus',
      onClose: (setIsOpen) => setIsOpen(false),
    }));

  it('should not be able to close the modal when onClose is not provided', async () =>
    validateComponent({
      title: 'Lorem ipsus',
    }));
});

describe('with custom title', () => {
  let validateComponent: TDialogComponentValidator;

  beforeEach(() => {
    console.warn = jest.fn();
    validateComponent = createConfirmationDialogValidator();
  });

  it('should render', () =>
    validateComponent({
      title: <DialogCustomTitle title="Custom Title" />,
      expectedTitle: 'Custom Title',
      ariaTitle: 'Custom aria title',
      extraChecks: () => {
        expect(
          screen.getByRole('button', { name: /Click me/ })
        ).toBeInTheDocument();
      },
    }));

  it('should render with a warning if no "ariaLabel" is provided', async () =>
    validateComponent({
      title: <DialogCustomTitle title="Custom Title" />,
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
