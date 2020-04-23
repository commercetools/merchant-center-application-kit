import React from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { useAsyncDispatch, actions } from '@commercetools-frontend/sdk';
import { useOnActionError } from '@commercetools-frontend/actions-global';
import Spacings from '@commercetools-uikit/spacings';
import Constraints from '@commercetools-uikit/constraints';
import Text from '@commercetools-uikit/text';
import PrimaryButton from '@commercetools-uikit/primary-button';
import { CodeBlock } from '@commercetools-docs/ui-kit';

const EchoServer = () => {
  const [result, setResult] = React.useState();
  const dispatch = useAsyncDispatch();
  const dispatchError = useOnActionError();
  const echoServerApiUrl = useApplicationContext(
    (context) => context.environment.echoServerApiUrl
  );
  const handleSendRequest = React.useCallback(() => {
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
        setResult(result);
      } catch (error) {
        dispatchError(error);
      }
    }
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
              <PrimaryButton label="Send request" onClick={handleSendRequest} />
            </Spacings.Inline>
            {result && (
              <CodeBlock
                content={JSON.stringify(result, null, 2)}
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
