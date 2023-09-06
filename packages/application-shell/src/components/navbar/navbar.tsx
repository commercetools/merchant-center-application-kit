import { default as NavBarNew, type TNavbarProps } from './navbar-new/navbar';
import { default as NavBarOld } from './navbar-old/navbar';

const NavBar = (props: TNavbarProps & { isNewNavigationEnabled: boolean }) => {
  if (!props.isNewNavigationEnabled) {
    return <NavBarOld {...props} />;
  }
  return <NavBarNew {...props} />;
};
NavBar.displayName = 'NavBar';

export default NavBar;
