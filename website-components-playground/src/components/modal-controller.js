import { useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import SecondaryButton from '@commercetools-uikit/secondary-button';

const GridContainer = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;
const PortalContainer = styled.div`
  flex: 1;
`;

const ModalController = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <PortalContainer id={props.containerId} />
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
ModalController.propTypes = {
  containerId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};

export default ModalController;
