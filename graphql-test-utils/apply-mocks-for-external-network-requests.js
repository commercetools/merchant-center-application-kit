import xhrMock from 'xhr-mock';

const applyMocksForExternalNetworkRequests = () => {
  xhrMock.post(/\/proxy\/mc-metrics\/metrics\/.*$/, {
    body: JSON.stringify({ message: 'ok' }),
  });
  xhrMock.get(/\.launchdarkly\.com\/.*$/, {
    body: JSON.stringify({}),
    headers: { 'Content-Type': 'application/json' },
  });
  xhrMock.post(/\.launchdarkly\.com\/.*$/, {
    body: JSON.stringify({}),
    headers: { 'Content-Type': 'application/json' },
  });
};

export default applyMocksForExternalNetworkRequests;
