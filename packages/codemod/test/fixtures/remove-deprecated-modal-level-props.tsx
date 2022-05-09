import {
  InfoModalPage,
  FormModalPage,
  CustomFormModalPage,
  TabularModalPage,
  TabHeader,
} from '@commercetools-frontend/application-components';

function Modal() {
  return (
    <>
      <InfoModalPage
        isOpen
        title="Hello"
        level={2}
        onClose={() => {}}
        baseZIndex={100}
      >
        Hello
      </InfoModalPage>
      <FormModalPage
        isOpen
        title="Hello"
        onPrimaryButtonClick={() => {}}
        onSecondaryButtonClick={() => {}}
        level={2}
        onClose={() => {}}
        baseZIndex={100}
      >
        Hello
      </FormModalPage>
      <CustomFormModalPage
        isOpen
        title="Hello"
        level={2}
        onClose={() => {}}
        baseZIndex={100}
      >
        Hello
      </CustomFormModalPage>
      <TabularModalPage
        isOpen
        title="Hello"
        tabControls={
          <>
            <TabHeader to="/one" label="One" />
            <TabHeader to="/two" label="Two" />
          </>
        }
        level={2}
        onClose={() => {}}
        baseZIndex={100}
      >
        Hello
      </TabularModalPage>
    </>
  );
}

export default Modal;
