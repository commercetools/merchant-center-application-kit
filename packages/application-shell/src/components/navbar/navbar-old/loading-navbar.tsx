import { useRef } from 'react';
import LoadingPlaceholder from '../../loading-placeholder';
// https://babeljs.io/blog/2017/09/11/zero-config-with-babel-macros
import useLoadingMenuLayoutEffect from '../use-loading-menu-layout-effect';
import { MenuItem, MenuGroup, NavBarLayout } from './menu-items';
import compiledStyles from /* preval */ './navbar.styles';

const styles = compiledStyles.jsonMap;

const LoadingNavBar = () => {
  const ref = useRef<HTMLDivElement>(null);
  useLoadingMenuLayoutEffect();
  return (
    <NavBarLayout ref={ref}>
      <MenuGroup id="main" level={1}>
        <>
          {Array.from(new Array(5)).map((_, index) => (
            <MenuItem
              key={index}
              hasSubmenu={false}
              isMenuOpen={false}
              isActive={false}
              onClick={() => undefined}
            >
              <div
                className={styles['loading-dot-container']}
                data-testid={`dot-container-${index}`}
              >
                <LoadingPlaceholder shape="dot" size="m" />
              </div>
            </MenuItem>
          ))}
        </>
      </MenuGroup>
    </NavBarLayout>
  );
};
LoadingNavBar.displayName = 'LoadingNavBar';

export default LoadingNavBar;
