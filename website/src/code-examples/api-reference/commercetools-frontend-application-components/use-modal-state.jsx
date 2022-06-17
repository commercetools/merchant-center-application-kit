import {
  useModalState,
  InfoDialog,
} from '@commercetools-frontend/application-components';

const MyComponent = () => {
  const infoModalState = useModalState();

  return (
    <div>
      <button onClick={infoModalState.openModal}>Click me</button>

      <InfoDialog
        isOpen={infoModalState.isModalOpen}
        onClose={infoModalState.closeModal}
        title="Welcome"
      >
        Hi there.
      </InfoDialog>
    </div>
  );
};
