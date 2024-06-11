import { useReducer } from 'react';

// const API_ENDPOINT =
//   'https://assistant-api.commercetools.vercel.app/api/assist/chat?mode=ama-gemini-grounded&stream=true&debug=false';
const API_ENDPOINT =
  'http://localhost:4004/api/assist/chat?mode=ama-gemini-grounded&stream=false&debug=false';
const API_AUTH_TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkNiWFNEWW5QRk9KSE1ZZXpxb05KaCJ9.eyJodHRwczovL2RvY3MuY29tbWVyY2V0b29scy5jb20vZW1haWwiOiJjYXJsb3MubWFydGluZXNAY29tbWVyY2V0b29scy5jb20iLCJodHRwczovL2RvY3MuY29tbWVyY2V0b29scy5jb20vZmlyc3RfbmFtZSI6IkNhcmxvcyIsImh0dHBzOi8vZG9jcy5jb21tZXJjZXRvb2xzLmNvbS9sYXN0X25hbWUiOiJDb3J0aXphcyIsImh0dHBzOi8vZG9jcy5jb21tZXJjZXRvb2xzLmNvbS9kaXNwbGF5X25hbWUiOiJDYXJsb3MgQ29ydGl6YXMiLCJodHRwczovL2RvY3MuY29tbWVyY2V0b29scy5jb20vZ2xvYmFsX2FjY291bnRfaWQiOiIiLCJodHRwczovL2RvY3MuY29tbWVyY2V0b29scy5jb20vZ2xvYmFsX2FjY291bnRfbmFtZSI6IiIsImlzcyI6Imh0dHBzOi8vYXV0aC5pZC5jb21tZXJjZXRvb2xzLmNvbS8iLCJzdWIiOiJhdXRoMHw2NjY3ZmNhZWQ1ZDZkMThhNDQwNzdjMTAiLCJhdWQiOlsiaHR0cHM6Ly9jb21tZXJjZXRvb2xzLmV1LmF1dGgwLmNvbS9hcGkvdjIvIiwiaHR0cHM6Ly9jb21tZXJjZXRvb2xzLmV1LmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3MTgwOTA5ODcsImV4cCI6MTcxODE3NzM4Nywic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF6cCI6InhMazhFRFVDYzhQS3FDYnJTSkNudWFodm44Nm5FbjR6In0.KGTE2sDNl__khFmhzG8gc6SOF5dj6nHd93r6LujWR1sYM07nX9l2Xq3ii-xhxaQxPx85cYg8bhcMejhGSSGzag2qybRIxaDozAnUez43szFuqp9-AbopUs8vkNJmmNchLcQGFeevWYPOOSX9V_aSyeglxrQz9CUaXOWxMxUQm090EOIOGS2kpA2bhvuaGgH37eNT_EmFce4NKwmrOC7k03wOONkcJMF6_KFj4UzTxThkxccr1zXnUNU6KOQAjVjRQB05ASF_ZEHZwDxKIZ_WrzGVDR01M9RhpWucIa025TCXU5z1BMroKoLz9K7AT4-vaeFyHssWH0MFeNTrF9x13w';

export type TAIMessage = {
  id?: string;
  content: string;
  role: 'user' | 'assistant';
};

type TAIResponse = {
  conversationId: string;
  messages: TAIMessage[];
};

type TAIState = {
  isLoading: boolean;
  data?: TAIMessage;
  error?: Error;
};

type TAIAction = {
  type: 'LOADING' | 'SUCCESS' | 'ERROR';
  payload?: TAIMessage;
  error?: Error;
};

const messagesCache: TAIMessage[] = [];

const initialState: TAIState = {
  isLoading: false,
};

const aiStateReducer = (state: TAIState, action: TAIAction): TAIState => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'SUCCESS':
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case 'ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

function useAiQuery() {
  const [state, dispatch] = useReducer(aiStateReducer, initialState);

  const sendQuery = async (query: string) => {
    dispatch({ type: 'LOADING' });
    try {
      const newMessage: TAIMessage = { content: query, role: 'user' };
      messagesCache.push(newMessage);
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_AUTH_TOKEN}`,
        },
        body: JSON.stringify({
          conversationId: Date.now().toString(),
          messages: messagesCache,
        }),
      });
      const data = (await response.json()) as TAIResponse;
      const responseMessage: TAIMessage = data.messages.pop()!;
      messagesCache.push(responseMessage);
      dispatch({ type: 'SUCCESS', payload: responseMessage });
    } catch (error) {
      dispatch({ type: 'ERROR', error: error as Error });
    }
  };

  return {
    state,
    sendQuery,
  };
}

export default useAiQuery;
