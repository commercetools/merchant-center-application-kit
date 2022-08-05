import { warning } from '@commercetools-uikit/utils';
import { screen, renderComponent } from '../../test-utils';
import FormMainPageLayout, {
  type TFormMainPageLayoutProps,
} from './form-main-page-layout';

jest.mock('@commercetools-uikit/utils', () => ({
  ...jest.requireActual('@commercetools-uikit/utils'),
  warning: jest.fn(),
}));

const renderFormMainPageLayout = (
  props?: Partial<TFormMainPageLayoutProps>
) => {
  return renderComponent(
    <FormMainPageLayout title="Test Title Page" onSubmit={() => {}} {...props}>
      <input />
      <button type="submit">submit</button>
    </FormMainPageLayout>
  );
};

describe('rendering', () => {
  it('should render title and default header content', () => {
    renderFormMainPageLayout({
      headerTitle: 'Test Header Title',
      headerSubtitle: 'Test Header Subtitle',
    });

    screen.getByText('Test Title Page');
    screen.getByText('Test Header Title');
    screen.getByText('Test Header Subtitle');
  });

  it('should warn if no title or custom title row is provided', () => {
    renderFormMainPageLayout();

    expect(warning).toHaveBeenCalledWith(
      false,
      'FormMainPageLayout: one of either `headerTitle` or `customHeaderRow` is required but both their values are `undefined`'
    );
  });

  it('should call onSubmit', () => {
    const onSubmit = jest.fn();

    renderFormMainPageLayout({ onSubmit });

    screen.getByText('submit').click();
    expect(onSubmit).toBeCalled();
  });

  it('should render customHeaderRow', () => {
    renderFormMainPageLayout({
      customHeaderRow: <div>Test Header Row</div>,
    });
    screen.getByText('Test Header Row');
  });
});
