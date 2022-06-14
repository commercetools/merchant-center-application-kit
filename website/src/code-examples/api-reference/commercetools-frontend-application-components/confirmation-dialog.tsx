import {
  ConfirmationDialog,
  useModalState,
} from '@commercetools-frontend/application-components';

const ChannelDeletion = () => {
  const confirmationModalState = useModalState();
  const handleConfirm = useCallback((event: SyntheticEvent) => {
    // Do something async
  }, []);

  return (
    <ConfirmationDialog
      title="Confirm channel deletion"
      isOpen={confirmationModalState.isModalOpen}
      onClose={confirmationModalState.closeModal}
      onCancel={confirmationModalState.closeModal}
      onConfirm={handleConfirm}
    >
      <Spacings.Stack scale="m">
        <Text.Body>{'Are you sure you want to delete this channel?'}</Text.Body>
      </Spacings.Stack>
    </ConfirmationDialog>
  );
};
