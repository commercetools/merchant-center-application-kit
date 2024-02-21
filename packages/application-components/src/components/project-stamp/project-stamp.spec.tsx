import { screen, renderComponent } from '../../test-utils';
import ProjectStamp from './project-stamp';

describe('rendering', () => {
  it('should render ProjectStamp - IsProduction', () => {
    renderComponent(<ProjectStamp.IsProduction />);

    expect(screen.getByText('Production')).toBeInTheDocument();
  });
  it('should render ProjectStamp - IsExpired', () => {
    renderComponent(<ProjectStamp.IsExpired />);

    expect(screen.getByText('Trial expired')).toBeInTheDocument();
  });
  it('should render ProjectStamp - WillExpire with 0 days left', () => {
    renderComponent(<ProjectStamp.WillExpire daysLeft={0} />);

    expect(screen.getByText('Trial ends today')).toBeInTheDocument();
  });
  it('should render ProjectStamp - WillExpire with 1 days left', () => {
    renderComponent(<ProjectStamp.WillExpire daysLeft={1} />);

    expect(screen.getByText('Trial ends in 1 day')).toBeInTheDocument();
  });
  it('should render ProjectStamp - WillExpire with 4 days left', () => {
    renderComponent(<ProjectStamp.WillExpire daysLeft={4} />);

    expect(screen.getByText('Trial ends in 4 days')).toBeInTheDocument();
  });
});
