import { graphql } from 'msw';
import { buildGraphqlList } from '@commercetools-test-data/core';
import * as ChannelMock from '@commercetools-test-data/channel';

it('should render channels', async () => {
  mockServer.use(
    graphql.query('FetchChannels', (req, res, ctx) => {
      const totalItems = 20;
      const itemsPerPage = 5;

      return res(
        ctx.data({
          channels: buildGraphqlList(
            Array.from({ length: itemsPerPage }).map((_, index) =>
              ChannelMock.random().key(`channel-key-${index}`)
            ),
            {
              name: 'Channel',
              total: totalItems,
            }
          ),
        })
      );
    })
  );

  // Actual test...
});
