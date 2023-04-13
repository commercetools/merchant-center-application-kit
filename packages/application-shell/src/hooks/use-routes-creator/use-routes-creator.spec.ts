import { hooks } from '../../test-utils';
import useRoutesCreator from './use-routes-creator';

const entryPointUriPath = 'avengers';

const useRoutes = () => {
  const { createRoute } = useRoutesCreator();

  const routes = {
    main: createRoute(`/:projectKey/${entryPointUriPath}`),
    heros: createRoute(`/:projectKey/${entryPointUriPath}/heros`),
    heroDetail: createRoute<'id'>(
      `/:projectKey/${entryPointUriPath}/heros/:id`
    ),
  };

  return routes;
};

describe('creating routes', () => {
  describe('getUrl', () => {
    it('should compute URL path', () => {
      const { result } = hooks.renderHook(() => useRoutes());
      const routes = result.current;

      expect(routes).toEqual(
        expect.objectContaining({
          main: expect.any(Object),
          heros: expect.any(Object),
          heroDetail: expect.any(Object),
        })
      );

      expect(routes.main.getUrl()).toMatchInlineSnapshot(
        `"/test-with-big-data/avengers"`
      );
      expect(routes.heros.getUrl()).toMatchInlineSnapshot(
        `"/test-with-big-data/avengers/heros"`
      );
      expect(routes.heroDetail.getUrl({ id: '123' })).toMatchInlineSnapshot(
        `"/test-with-big-data/avengers/heros/123"`
      );
      expect(
        routes.heroDetail.getUrl(
          { id: '123' },
          new URLSearchParams({ isNew: 'true' })
        )
      ).toMatchInlineSnapshot(
        `"/test-with-big-data/avengers/heros/123?isNew=true"`
      );
    });
    it('throws when required params are missing', () => {
      const { result } = hooks.renderHook(() => useRoutes());
      const routes = result.current;

      expect(() => routes.heroDetail.getUrl()).toThrow();
    });
  });
  describe('go', () => {
    it('should redirect to another route', () => {
      const { result, history } = hooks.renderHook(() => useRoutes());
      const routes = result.current;

      expect(history.location.pathname).toMatchInlineSnapshot(
        `"/test-with-big-data/random-entry-point"`
      );

      routes.heros.go();

      expect(history.location.pathname).toMatchInlineSnapshot(
        `"/test-with-big-data/avengers/heros"`
      );

      routes.heroDetail.go({
        id: '123',
      });

      expect(history.location.pathname).toMatchInlineSnapshot(
        `"/test-with-big-data/avengers/heros/123"`
      );
    });
    it('throws when required params are missing', () => {
      const { result } = hooks.renderHook(() => useRoutes());
      const routes = result.current;

      expect(() => routes.heroDetail.go()).toThrow();
    });
  });
});
