import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const MessageBubble = styled.div`
  display: inline-block;
  padding: 16px;
  border-radius: 16px;
  max-width: 66%;
  background-color: ${({ isAi }) => (isAi ? '#f2f2f2' : '#e6f7ff')};
`;

export const MessageContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  padding: 0;
  margin: 0;
  flex-direction: column;
`;
