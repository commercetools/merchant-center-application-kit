import { graphql } from 'msw';

it('should render channels', async () => {
  mockServer.use(
    graphql.query('FetchChannels', (req, res, ctx) => {
      return res(
        ctx.data({
          channels: {
            // Mocked data
          },
        })
      );
    })
  );

  // Actual test...
});
