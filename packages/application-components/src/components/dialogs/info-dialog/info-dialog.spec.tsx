import { screen } from '../../../test-utils';
import {
  DialogCustomTitle,
  TDialogComponentValidator,
  createDialogValidator,
} from '../internals/dialog-test-utils';
import InfoDialog from './info-dialog';

describe('rendering', () => {
  let validateComponent: TDialogComponentValidator;

  beforeEach(() => {
    validateComponent = createDialogValidator({
      component: InfoDialog,
    });
  });

  it('should open the modal and close it by clicking on the close button', () =>
    validateComponent({
      title: 'Lorem ipsus',
    }));
});

describe('with custom title', () => {
  let validateComponent: TDialogComponentValidator;

  beforeEach(() => {
    console.warn = jest.fn();
    validateComponent = createDialogValidator({
      component: InfoDialog,
    });
  });

  it('should render', () =>
    validateComponent({
      title: <DialogCustomTitle title="Custom Title" />,
      expectedTitle: 'Custom Title',
      'aria-label': 'Custom aria title',
      extraChecks: () => {
        expect(
          screen.getByRole('button', { name: /Click me/ })
        ).toBeInTheDocument();
      },
    }));

  it('should render with a warning if no "aria-label" is provided', async () =>
    validateComponent({
      title: <DialogCustomTitle title="Custom Title" />,
      expectedTitle: 'Custom Title',
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
