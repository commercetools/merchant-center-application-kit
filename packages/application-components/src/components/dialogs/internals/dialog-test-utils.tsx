import { ComponentType, Dispatch, ReactNode, useState } from 'react';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { screen, renderComponent, fireEvent } from '../../../test-utils';
import { TConfirmationDialogProps } from '../confirmation-dialog';
import { TFormDialogProps } from '../form-dialog';
import { TInfoDialogProps } from '../info-dialog';

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

type TDialogCustomTitleProps = {
  title: string;
};
export const DialogCustomTitle = (props: TDialogCustomTitleProps) => {
  return (
    <Spacings.Inset scale="xl">
      <Text.Headline as="h3" title={props.title} truncate>
        {props.title}
      </Text.Headline>
      <SecondaryButton label="Click me" tone="info" />
    </Spacings.Inset>
  );
};

export type TCreateDialogValidatorParams = {
  component: ComponentType<
    TConfirmationDialogProps | TFormDialogProps | TInfoDialogProps
  >;
  onClose?: (setter: Dispatch<boolean>) => void;
  extraProps?: Record<string, unknown>;
  extraChecks?: () => void;
};
export type TDialogValidatorParams = {
  title: ReactNode;
  expectedTitle?: string;
  'aria-label'?: string;
  onClose?: (setter: Dispatch<boolean>) => void;
  extraProps?: Record<string, unknown>;
  extraChecks?: () => void;
};
export type TDialogComponentValidator = (
  params: TDialogValidatorParams
) => Promise<void>;
export const createDialogValidator =
  (creatorParams: TCreateDialogValidatorParams) =>
  async (validatorParams: TDialogValidatorParams) => {
    renderComponent(
      <DialogController>
        {({ isOpen, setIsOpen }) => (
          <creatorParams.component
            title={validatorParams.title}
            aria-label={validatorParams['aria-label']}
            isOpen={isOpen}
            onClose={() => {
              creatorParams.onClose?.(setIsOpen);
              validatorParams.onClose?.(setIsOpen);
            }}
            {...creatorParams.extraProps}
            {...validatorParams.extraProps}
          >
            {'Hello'}
          </creatorParams.component>
        )}
      </DialogController>
    );

    const expectedTitle =
      typeof validatorParams.title === 'string'
        ? validatorParams.title
        : validatorParams.expectedTitle!;
    const expectedAriaTitle =
      validatorParams['aria-label'] ||
      (typeof validatorParams.title === 'string' ? expectedTitle : null);

    expect(screen.queryByText(expectedTitle)).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/Open Info Dialog/));
    await screen.findByText(expectedTitle);
    expect(screen.getByText(/Hello/)).toBeInTheDocument();

    if (expectedAriaTitle) {
      expect(
        screen.getByRole('dialog', { name: expectedAriaTitle })
      ).toBeInTheDocument();
    }

    creatorParams.extraChecks?.();
    validatorParams.extraChecks?.();

    if (creatorParams.onClose || validatorParams.onClose) {
      fireEvent.click(screen.getByLabelText(/Close dialog/i));
      expect(screen.queryByText(expectedTitle)).not.toBeInTheDocument();
    } else {
      expect(screen.queryByText(/Close dialog/i)).not.toBeInTheDocument();
    }
  };
