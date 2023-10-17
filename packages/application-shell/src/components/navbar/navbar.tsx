import { default as NavBarNew, type TNavbarProps } from './navbar-new/navbar';

const NavBar = (props: TNavbarProps) => {
  return <NavBarNew {...props} />;
};
NavBar.displayName = 'NavBar';

export default NavBar;
