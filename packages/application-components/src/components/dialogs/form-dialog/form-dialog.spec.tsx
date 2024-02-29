import { screen, fireEvent } from '../../../test-utils';
import {
  DialogCustomTitle,
  TDialogComponentValidator,
  createDialogValidator,
} from '../internals/dialog-test-utils';
import FormDialog from './form-dialog';

const createFormDialogValidator = () => {
  const onCancel = jest.fn();
  const onConfirm = jest.fn();

  return createDialogValidator({
    component: FormDialog,
    extraProps: {
      onSecondaryButtonClick: onCancel,
      onPrimaryButtonClick: onConfirm,
    },
    extraChecks: () => {
      fireEvent.click(screen.getByLabelText('Cancel'));
      expect(onCancel).toHaveBeenCalled();
      fireEvent.click(screen.getByLabelText('Save'));
      expect(onConfirm).toHaveBeenCalled();
    },
  });
};

describe('rendering', () => {
  let validateComponent: TDialogComponentValidator;

  beforeEach(() => {
    validateComponent = createFormDialogValidator();
  });

  it('should open the modal and close it by clicking on the close button', () =>
    validateComponent({
      title: 'Lorem ipsus',
      onClose: (setIsOpen) => setIsOpen(false),
    }));

  it('should not be able to close the modal when onClose is not provided', () =>
    validateComponent({
      title: 'Lorem ipsus',
    }));

  it('should show secondaryButton Icon', () =>
    validateComponent({
      title: 'Lorem ipsus',
      extraProps: {
        iconLeftSecondaryButton: <div>button icon</div>,
      },
      extraChecks: () => {
        screen.getByText('button icon');
      },
    }));
});

describe('with custom title', () => {
  let validateComponent: TDialogComponentValidator;

  beforeEach(() => {
    console.warn = jest.fn();
    validateComponent = createFormDialogValidator();
  });

  it('should render', () =>
    validateComponent({
      title: <DialogCustomTitle title="Custom Title" />,
      onClose: (setIsOpen) => setIsOpen(false),
      expectedTitle: 'Custom Title',
      'aria-label': 'Custom aria title',
      extraChecks: () => {
        expect(
          screen.getByRole('button', { name: /Click me/ })
        ).toBeInTheDocument();
      },
    }));

  it('should render with a warning if no "aria-label" is provided', () =>
    validateComponent({
      title: <DialogCustomTitle title="Custom Title" />,
      expectedTitle: 'Custom Title',
      onClose: (setIsOpen) => setIsOpen(false),
      extraChecks: () => {
        expect(
          screen.getByRole('button', { name: /Click me/ })
        ).toBeInTheDocument();
        expect(console.warn).toHaveBeenCalledWith(
          expect.stringContaining(
            `app-kit/DialogHeader: "aria-label" prop is required`
          )
        );
      },
    }));
});
