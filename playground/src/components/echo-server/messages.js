import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'StateMachines.EchoServer.title',
    defaultMessage: 'Echo Server',
  },
  description: {
    id: 'StateMachines.EchoServer.description',
    defaultMessage:
      'This page demonstrates how to connect a Custom Application to an external API, using the <linkDocs>"/proxy/forward-to" endpoint</linkDocs>.\nFor demo purposes, the external API used by this page is a simple echo server, which just returns some information about the request sent.',
  },
  labelSending: {
    id: 'StateMachines.EchoServer.labelSending',
    defaultMessage: 'Sending...',
  },
  labelSendRequest: {
    id: 'StateMachines.EchoServer.labelSendRequest',
    defaultMessage: 'Send request',
  },
  labelIncludeParamsInRequest: {
    id: 'StateMachines.EchoServer.labelIncludeParamsInRequest',
    defaultMessage: 'Inlude Parameter in request',
  },
  labelIncludeForwardHeaderInRequest: {
    id: 'StateMachines.EchoServer.labelIncludeForwardHeaderInRequest',
    defaultMessage: 'Inlude Forward Header in request',
  },
});
