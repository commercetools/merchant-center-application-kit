import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';

const Channels = () => {
  // ...
  return (
    <Spacings.Stack scale="l">
      <Spacings.Stack scale="s">
        <Text.Headline as="h2">Title</Text.Headline>
        <Text.Body>Description</Text.Body>
      </Spacings.Stack>
      <Spacings.Stack scale="xs">
        <table>{/* Table data */}</table>
        <div>{/* Pagination */}</div>
      </Spacings.Stack>
    </Spacings.Stack>
  );
};
