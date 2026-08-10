import { getUserContextForLaunchDarklyAdapter } from './setup-flop-flip-provider';

describe('getUserContextForLaunchDarklyAdapter', () => {
  describe('when the user has an id', () => {
    it('should return a non-anonymous single-kind context with the user id as the key', () => {
      const context = getUserContextForLaunchDarklyAdapter(
        // @ts-expect-error partial user for testing purposes
        { id: 'user-1' },
        'project-1'
      );

      expect(context).toMatchObject({
        kind: 'user',
        key: 'user-1',
        project: 'project-1',
      });
      expect(context).not.toHaveProperty('anonymous');
    });
  });

  describe('when there is no user', () => {
    it('should return an anonymous single-kind context without a key', () => {
      const context = getUserContextForLaunchDarklyAdapter(
        undefined,
        'project-1'
      );

      expect(context).toMatchObject({
        kind: 'user',
        anonymous: true,
        project: 'project-1',
      });
      expect(context).not.toHaveProperty('key');
    });
  });
});
