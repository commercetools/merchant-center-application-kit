import { useEffect, useRef, useState } from 'react';
import { css, keyframes } from '@emotion/react';
import { createPortal } from 'react-dom';
import Markdown from 'react-markdown';
import { useModalState } from '@commercetools-frontend/application-components';
import { useAiQuery } from '@commercetools-frontend/application-shell-connectors';
import Avatar from '@commercetools-uikit/avatar';
import { designTokens } from '@commercetools-uikit/design-system';
import IconButton from '@commercetools-uikit/icon-button';
import {
  ArrowRightIcon,
  BrainIcon,
  CloseIcon,
} from '@commercetools-uikit/icons';
import MultilineTextInput from '@commercetools-uikit/multiline-text-input';
import PrimaryButton from '@commercetools-uikit/primary-button';
import Text from '@commercetools-uikit/text';
import { components } from './markdown-mapping';
import {
  AiAvatar,
  BusyBubble,
  MessageBubble,
  MessageContainer,
} from './message-container';

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const modalContainerStyle = css`
  position: fixed;
  display: flex;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 999999;
`;
const modalContentStyle = css`
  width: calc(100vw - 32px);
  height: calc(100vh - 32px);
  max-width: 980px;
  background-color: white;
  margin: auto;
  border-radius: 5px;
  position: relative;
  animation: ${slideUp} 0.25s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
`;

const closeButtonStyle = css`
  position: absolute;
  top: 8px;
  right: 8px;
`;

const MiniPortal = ({ children }) => {
  return createPortal(children, document.body);
};

interface UnnecessaryModalProps {
  isOpen: boolean;
  onCloseRequest: () => void;
  children: React.ReactNode;
}

const UnnecessaryModal = ({
  isOpen,
  onCloseRequest,
  children,
}: UnnecessaryModalProps) => {
  if (!isOpen) return null;
  return (
    <MiniPortal>
      <div css={modalContainerStyle}>
        <div css={modalContentStyle}>
          {children}

          <div css={closeButtonStyle}>
            <IconButton
              icon={<CloseIcon />}
              label="Close Assistant"
              onClick={onCloseRequest}
            />
          </div>
        </div>
      </div>
    </MiniPortal>
  );
};

const AiAssistant = () => {
  const { openModal, isModalOpen, closeModal } = useModalState();
  const { sendQuery, messages, isBusy } = useAiQuery();
  const [q, setQ] = useState('How can I create a product variant?');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    sendQuery(q);
    setQ('');
    setTimeout(scrollToBottom, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      css={css`
        margin-right: 16px;
      `}
    >
      <IconButton
        label="Start AI assistant"
        icon={<BrainIcon />}
        onClick={openModal}
      />
      <UnnecessaryModal isOpen={isModalOpen} onCloseRequest={closeModal}>
        <div
          css={css`
            display: flex;
            width: 100%;
            height: 100%;
            flex-direction: column;
            padding: 16px;
          `}
        >
          <div
            css={css`
              text-align: center;
            `}
          >
            <Text.Headline as="h2">Merchant Center Assistant</Text.Headline>
          </div>
          <div
            css={css`
              flex-grow: 1;
              margin-top: 16px;
              margin-bottom: 16px;
              overflow: auto;
            `}
          >
            <MessageContainer as="ul">
              {messages &&
                messages
                  .filter((message) => message.role !== 'system')
                  .map((message, index) => (
                    <li
                      key={message.id}
                      css={css`
                        margin-bottom: 16px;
                        display: flex;
                        width: 100%;
                        gap: 16px;
                        align-items: center;
                        justify-content: ${message.role === 'assistant'
                          ? 'flex-start'
                          : 'flex-end'};
                      `}
                    >
                      <div
                        style={{
                          order: message.role === 'assistant' ? 0 : 1,
                        }}
                      >
                        {message.role === 'assistant' ? (
                          <AiAvatar />
                        ) : (
                          <Avatar firstName={'M'} lastName={'E'} size="m" />
                        )}
                      </div>

                      <MessageBubble
                        key={index}
                        isAi={message.role === 'assistant'}
                      >
                        <Markdown components={components}>
                          {message.content}
                        </Markdown>
                      </MessageBubble>
                    </li>
                  ))}
              {isBusy && <BusyBubble />}
              <div ref={messagesEndRef} />
            </MessageContainer>
          </div>

          <form onSubmit={onSubmitHandler}>
            <div
              css={css`
                display: flex;
                flex-grow: 0;
              `}
            >
              <div
                css={css`
                  flex-grow: 1;
                  margin-right: 16px;
                `}
              >
                <MultilineTextInput
                  name="query"
                  value={q}
                  placeholder="How can I create a product variant?"
                  onChange={(e) => setQ(e.target.value)}
                  isDisabled={isBusy}
                />
              </div>
              <div>
                <PrimaryButton
                  iconLeft={<ArrowRightIcon />}
                  label="Send"
                  type="submit"
                  isDisabled={isBusy}
                />
              </div>
            </div>
          </form>
        </div>
      </UnnecessaryModal>
    </div>
  );
};

export default AiAssistant;
