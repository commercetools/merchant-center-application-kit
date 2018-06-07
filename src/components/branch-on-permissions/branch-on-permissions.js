import { compose, branch, renderNothing, renderComponent } from 'recompose';
import { injectAuthorized } from '../authorized';

const branchUnauthorized = FallbackComponent =>
  branch(
    props => !props.isAuthorized,
    FallbackComponent ? renderComponent(FallbackComponent) : renderNothing
  );

const branchOnPermissions = (demandedPermissions, FallbackComponent, options) =>
  compose(
    injectAuthorized(demandedPermissions, options),
    branchUnauthorized(FallbackComponent)
  );

export default branchOnPermissions;
