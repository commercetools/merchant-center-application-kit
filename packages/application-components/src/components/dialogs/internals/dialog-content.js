import styled from '@emotion/styled';

const DialogContent = styled.div`
  border-top: 1px solid var(--border-color-separator);
  padding: var(--spacing-m) 0 var(--spacing-s);
  flex: 1;

  /* The overflow should be "auto", to make the container scrollable */
  overflow: auto;
`;

export default DialogContent;
