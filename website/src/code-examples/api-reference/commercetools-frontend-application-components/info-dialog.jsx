import {
  InfoDialog,
  useModalState,
} from '@commercetools-frontend/application-components';

const ChannelsInfo = () => {
  const infoModalState = useModalState();

  return (
    <InfoDialog
      title="About channels"
      isOpen={infoModalState.isModalOpen}
      onClose={infoModalState.closeModal}
    >
      <Spacings.Stack scale="m">
        <Text.Body>{'Channels are ...'}</Text.Body>
      </Spacings.Stack>
    </InfoDialog>
  );
};
