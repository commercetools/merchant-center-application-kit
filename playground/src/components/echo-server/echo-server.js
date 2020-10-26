import { useReducer, useCallback } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { useAsyncDispatch, actions } from '@commercetools-frontend/sdk';
import { useOnActionError } from '@commercetools-frontend/actions-global';
import Spacings from '@commercetools-uikit/spacings';
import Constraints from '@commercetools-uikit/constraints';
import Text from '@commercetools-uikit/text';
import PrimaryButton from '@commercetools-uikit/primary-button';
import { CodeBlock } from '@commercetools-docs/ui-kit';

const initialState = {
  isLoading: false,
  result: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return { isLoading: true, result: null };
    case 'complete':
      return { isLoading: false, result: action.payload };
    default:
      return state;
  }
};

const EchoServer = () => {
  const [state, dispatchState] = useReducer(reducer, initialState);
  const dispatch = useAsyncDispatch();
  const dispatchError = useOnActionError();
  const echoServerApiUrl = useApplicationContext(
    (context) => context.environment.echoServerApiUrl
  );
  const handleSendRequest = useCallback(() => {
    async function ping() {
      try {
        const result = await dispatch(
          actions.forwardTo.post({
            uri: echoServerApiUrl,
            payload: {
              say: 'Hello',
            },
          })
        );
        dispatchState({ type: 'complete', payload: result });
      } catch (error) {
        dispatchState({ type: 'complete' });
        dispatchError(error);
      }
    }
    dispatchState({ type: 'loading' });
    ping();
  });
  return (
    <Spacings.Inset>
      <Spacings.Stack>
        <Text.Headline as="h1">{'Echo Server'}</Text.Headline>
        <Spacings.Stack>
          <Text.Body>
            {
              'This page demonstrate how to connect a Custom Application to an external API, using the "/proxy/forward-to" endpoint.'
            }
          </Text.Body>
          <Text.Body>
            {
              'For demo purposes, the external API used by this page is a simple echo server, which just returns some information about the request sent.'
            }
          </Text.Body>
        </Spacings.Stack>
        <Constraints.Horizontal constraint="xl">
          <Spacings.Stack>
            <Spacings.Inline>
              <PrimaryButton
                label={state.isLoading ? 'Sending...' : 'Send request'}
                onClick={handleSendRequest}
                isDisabled={state.isLoading}
              />
            </Spacings.Inline>
            {state.result && (
              <CodeBlock
                content={JSON.stringify(state.result, null, 2)}
                language="json"
              />
            )}
          </Spacings.Stack>
        </Constraints.Horizontal>
      </Spacings.Stack>
    </Spacings.Inset>
  );
};

export default EchoServer;
