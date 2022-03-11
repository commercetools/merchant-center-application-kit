const validateEmail = require('./validateEmail');

describe.each`
  email                         | isValid
  ${'foobar@gmail.com'}         | ${true}
  ${'foobar'}                   | ${false}
  ${'foobar.com'}               | ${false}
  ${'foobar@commercetools.com'} | ${true}
  ${'foobar@'}                  | ${false}
`('is "$email" valid?', ({ email, isValid }) => {
  it(`should check if email is valid`, () => {
    expect(validateEmail(email)).toBe(isValid);
  });
});
