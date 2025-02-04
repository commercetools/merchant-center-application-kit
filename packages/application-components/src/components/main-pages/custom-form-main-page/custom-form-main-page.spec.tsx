import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { warning } from '@commercetools-uikit/utils';
import { screen, renderComponent } from '../../../test-utils';
import CustomFormMainPage from './custom-form-main-page';

jest.mock('@commercetools-uikit/utils', () => ({
  ...jest.requireActual('@commercetools-uikit/utils'),
  warning: jest.fn(),
}));

const Content = () => (
  <Spacings.Stack>
    <Text.Body>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit
    </Text.Body>
  </Spacings.Stack>
);

const renderCustomFormMainPage = (additionalProps = {}) => {
  renderComponent(
    <CustomFormMainPage {...additionalProps}>
      <Content />
    </CustomFormMainPage>
  );
};

describe('rendering', () => {
  it('should render content', () => {
    renderCustomFormMainPage({ title: 'Test Title' });

    screen.getByText(/Lorem ipsum dolor sit amet/i);
  });

  it('should render title and subtitle', () => {
    renderCustomFormMainPage({
      title: 'Test Title',
      subtitle: 'Test Subtitle',
    });

    screen.getByText('Test Title');
    screen.getByText('Test Subtitle');
  });

  it('should render custom title row', () => {
    const customTitleRow = <div>Test Custom Title</div>;
    renderCustomFormMainPage({ customTitleRow });

    screen.getByText('Test Custom Title');
  });

  it('should warn if no title nor custom title row are provided', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    renderCustomFormMainPage();

    expect(warning).toHaveBeenCalledWith(
      false,
      'CustomFormMainPage: one of either `title` or `customTitleRow` is required but both their values are `undefined`'
    );
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "Warning: Invalid prop 'title' supplied to 'TextHeadline'. Expected it to be nonempty string, but it was empty."
      )
    );

    warnSpy.mockRestore();
  });

  it('should show form controls', () => {
    const mockSecondaryOnClick = jest.fn();
    const mockPrimaryOnClick = jest.fn();

    const formControls = (
      <>
        <CustomFormMainPage.FormSecondaryButton
          onClick={mockSecondaryOnClick}
          label="Test Secondary Button"
        />
        <CustomFormMainPage.FormPrimaryButton
          label="Test Primary Button"
          onClick={mockPrimaryOnClick}
        />
      </>
    );

    renderCustomFormMainPage({
      title: 'Test title',
      formControls,
    });

    screen.getByText('Test Secondary Button').click();
    expect(mockSecondaryOnClick).toHaveBeenCalled();

    screen.getByText('Test Primary Button').click();
    expect(mockPrimaryOnClick).toHaveBeenCalled();
  });
});
