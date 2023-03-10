import { type ReactNode, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';

type TModalControllerFunctionOptions = {
  isOpen: boolean;
  setIsOpen: (nextValue: boolean) => void;
};
type TModalControllerProps = {
  title: string;
  buttonLabel: string;
  children: (options: TModalControllerFunctionOptions) => ReactNode;
};

const GridContainer = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const ModalController = (props: TModalControllerProps) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <div
        css={css`
          height: 100%;
          display: grid;
          grid-template-columns: auto;
          grid-template-rows: auto;
          align-items: center;
          justify-content: center;
        `}
      >
        <GridContainer>
          <Spacings.Stack>
            <Text.Body>{props.title}</Text.Body>
            <Spacings.Inline>
              <SecondaryButton
                label={props.buttonLabel}
                onClick={() => setIsOpen(true)}
              />
            </Spacings.Inline>
            {props.children({ isOpen, setIsOpen })}
          </Spacings.Stack>
        </GridContainer>
      </div>
    </>
  );
};
ModalController.displayName = 'ModalController';

export default ModalController;
