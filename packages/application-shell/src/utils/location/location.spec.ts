import location from './location';

const createLocation = (href: string) => ({
  href,
  replace: jest.fn(),
  reload: jest.fn(),
});

describe('reloadWithReplace', () => {
  it('should replace the current URL so the navigation can run a view transition', () => {
    const currentLocation = createLocation(
      'https://mc.example.com/my-project/discounts'
    );

    location.reloadWithReplace(currentLocation);

    expect(currentLocation.replace).toHaveBeenCalledWith(
      'https://mc.example.com/my-project/discounts'
    );
    expect(currentLocation.reload).not.toHaveBeenCalled();
  });

  it.each([
    ['a fragment', 'https://mc.example.com/my-project/discounts#rules'],
    ['a bare trailing #', 'https://mc.example.com/my-project/discounts#'],
  ])(
    'should reload when the URL has %s, which replace would only scroll to',
    (_, href) => {
      const currentLocation = createLocation(href);

      location.reloadWithReplace(currentLocation);

      expect(currentLocation.reload).toHaveBeenCalled();
      expect(currentLocation.replace).not.toHaveBeenCalled();
    }
  );
});
