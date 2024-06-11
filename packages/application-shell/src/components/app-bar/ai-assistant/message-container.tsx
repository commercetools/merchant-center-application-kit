import { css } from '@emotion/react';
import styled from '@emotion/styled';
import SyncLoader from 'react-spinners/SyncLoader';
import Avatar from '@commercetools-uikit/avatar';
import { designTokens } from '@commercetools-uikit/design-system';
import { Icon } from '../../navbar/shared.styles';
import { BrainIcon } from '@commercetools-uikit/icons';

export const MessageBubble = styled.div`
  display: inline-block;
  padding: 16px;
  border-radius: 16px;
  max-width: 66%;
  background-color: ${({ isAi }) =>
    isAi ? designTokens.colorPrimary95 : designTokens.colorNeutral98};
  overflow: auto;
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

export const AiAvatar = () => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        background-color: ${designTokens.colorPrimary95};
      `}
    >
      <BrainIcon color="primary40" />
    </div>
  );
};

export const BusyBubble = () => {
  return (
    <li
      css={css`
        margin-bottom: 16px;
        display: flex;
        width: 100%;
        gap: 16px;
        align-items: center;
        justify-content: flex-start;
      `}
    >
      <div>
        <AiAvatar />
      </div>
      <MessageBubble isAi={true}>
        <SyncLoader size={8} color={designTokens.colorPrimary85} />
      </MessageBubble>
    </li>
  );
};
