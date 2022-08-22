import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
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
    renderCustomFormMainPage();

    expect(warning).toHaveBeenCalledWith(
      false,
      'CustomFormMainPage: one of either `title` or `customTitleRow` is required but both their values are `undefined`'
    );
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
    expect(mockSecondaryOnClick).toBeCalled();

    screen.getByText('Test Primary Button').click();
    expect(mockPrimaryOnClick).toBeCalled();
  });
});
