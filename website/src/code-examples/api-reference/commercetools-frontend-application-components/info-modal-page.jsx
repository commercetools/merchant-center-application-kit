import {
  InfoModalPage,
  useModalState,
} from '@commercetools-frontend/application-components';

const Example = () => {
  const { isModalOpen, closeModal } = useModalState(true);

  return (
    <InfoModalPage
      title="Lorem ipsum"
      isOpen={isModalOpen}
      onClose={closeModal}
      subtitle={<Text.Body>{'Lorem ipsum ...'}</Text.Body>}
      topBarCurrentPathLabel="Lorem ipsum"
      topBarPreviousPathLabel="Back"
    >
      <Text.Body>{'Lorem ipsum ...'}</Text.Body>
    </InfoModalPage>
  );
};
