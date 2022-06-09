import Spacings from '@commercetools-uikit/spacings';

const Channels = () => {
  // ...
  return (
    <Spacings.Stack scale="l">
      <Spacings.Stack scale="s">
        <div>Title</div>
        <div>Description</div>
      </Spacings.Stack>
      <Spacings.Stack scale="xs">
        <table>{/* Table data */}</table>
        <div>{/* Pagination */}</div>
      </Spacings.Stack>
    </Spacings.Stack>
  );
};
