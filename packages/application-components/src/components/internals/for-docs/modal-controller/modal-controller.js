import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {
  Spacings,
  Text,
  SecondaryButton,
} from '@commercetools-frontend/ui-kit';

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

const ModalController = props => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <PortalContainer id={props.containerId} />
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
