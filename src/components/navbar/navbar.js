import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash.isnil';
import { FormattedMessage } from 'react-intl';
import { NavLink, matchPath, withRouter } from 'react-router-dom';
import { ToggleFeature } from '@flopflip/react-broadcast';
import { compose, withProps } from 'recompose';
import classnames from 'classnames';
import omit from 'lodash.omit';
import oneLineTrim from 'common-tags/lib/oneLineTrim';
import * as Icons from '@commercetools-local/ui-kit/icons';
import { getDataAttribute } from '@commercetools-local/utils/dataset';
import * as storage from '@commercetools-local/storage';
import { AppShellProviderForUserPermissions } from '@commercetools-local/application-shell-connectors';
import { RestrictedByPermissions } from '@commercetools-local/permissions';
import { STORAGE_KEYS } from '../../constants';
import { withProject } from '../fetch-project';
import styles from './navbar.mod.css';
import { defaultNavigationItems } from './config';
import messages from './messages';

/*
<DataMenu data={[]}>
  <MenuGroup>
    <MenuItem>
      <MenuItemLink linkTo="/foo">(icon) Products</MenuItemLink>
      <MenuGroup>
        <MenuItemLink linkTo="/foo/new">Add product</MenuItemLink>
      </MenuGroup>
    </MenuItem>
  </MenuGroup>
  <MenuExpander/>
</DataMenu>
*/

const PLUGIN_NAMES = {
  SETTINGS: 'settings',
};

export const MenuExpander = props => (
  <li
    key="expander"
    className={classnames(styles['list-item'], styles.expander, {
      [styles.hidden]: !props.isVisible,
    })}
  >
    <div onClick={props.onClick} className={styles['expand-icon']}>
      {/*
        FIXME: define hover effect.
        https://github.com/commercetools/merchant-center-frontend/issues/2216
      */}
      <Icons.BackIcon theme="white" />
    </div>
  </li>
);
MenuExpander.displayName = 'MenuExpander';
MenuExpander.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export const MenuGroup = props => (
  <ul
    className={classnames(
      { [styles.list]: props.level === 1 },
      { [styles.sublist]: props.level === 2 },
      {
        [styles['sublist-no-children']]: props.level === 2 && !props.children,
      },
      {
        [styles['sublist-expanded__active']]:
          props.level === 2 && props.isActive && props.isExpanded,
      },
      props.level === 2 && props.isActive && !props.isExpanded
        ? styles['sublist-collapsed__active']
        : styles.sublist__inactive
    )}
  >
    {props.children}
  </ul>
);
MenuGroup.displayName = 'MenuGroup';
MenuGroup.propTypes = {
  level: PropTypes.oneOf([1, 2]).isRequired,
  isActive: PropTypes.bool,
  isExpanded: PropTypes.bool,
  children: PropTypes.node,
};

export const MenuItem = props => (
  <li
    className={classnames(styles['list-item'], {
      [styles.item__active]: props.isActive,
      [styles['item_menu-collapsed']]: !props.isMenuOpen,
      [styles['item__no-submenu']]: !props.hasSubmenu,
      [styles['item--bottom']]: props.isBottomItem,
    })}
    onClick={props.onClick}
    onMouseEnter={props.onMouseEnter}
    onMouseLeave={props.onMouseLeave}
  >
    <div className={styles['item-link']}>{props.children}</div>
  </li>
);
MenuItem.displayName = 'MenuItem';
MenuItem.propTypes = {
  hasSubmenu: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  isBottomItem: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export class MenuItemLink extends React.PureComponent {
  static displayName = 'MenuItemLink';
  static propTypes = {
    linkTo: PropTypes.string,
    exactMatch: PropTypes.bool,
    externalLink: PropTypes.string,
    tracking: PropTypes.shape({
      'data-track-component': PropTypes.string,
      'data-track-event': PropTypes.string,
      'data-track-label': PropTypes.string,
    }),
    children: PropTypes.node.isRequired,
    useFullRedirectsForLinks: PropTypes.bool.isRequired,
  };
  static defaultProps = {
    exactMatch: false,
    tracking: {},
  };
  redirectTo = targetUrl => window.location.replace(targetUrl);
  render() {
    if (this.props.externalLink) {
      return (
        <a
          href={this.props.externalLink}
          rel="noopener noreferrer"
          target="_blank"
          {...this.props.tracking}
        >
          {this.props.children}
        </a>
      );
    }
    return this.props.linkTo ? (
      <NavLink
        to={this.props.linkTo}
        exact={this.props.exactMatch}
        activeClassName={styles.highlighted}
        className={styles['text-link']}
        onClick={event => {
          if (this.props.useFullRedirectsForLinks) {
            event.preventDefault();
            this.redirectTo(this.props.linkTo);
          }
        }}
      >
        {this.props.children}
      </NavLink>
    ) : (
      this.props.children
    );
  }
}

// This component just render two divs with borders in order to differentiate
// the settings plugin from the other ones
export const MenuItemDivider = () => (
  <div className={styles['divider-first-item']}>
    <div className={styles['divider-second-item']} />
  </div>
);

MenuItemDivider.displayName = 'MenuItemDivider';

// This component basically just wraps the `<RestrictedByPermissions>`
// and the `<ToggleFeature>` components. However, it's necessary to have it as
// the `<ToggleFeature>` wrapper should be rendered only if the `featureToggle`
// prop is defined. This is because `<ToggleFeature>` will not render any
// children if the flag is missing/not found.
export const ToggledWithPermissions = props => {
  const permissionsWrapper = (
    <RestrictedByPermissions
      permissions={props.permissions || []}
      shouldMatchSomePermissions={Boolean(props.permissions)}
    >
      {props.children}
    </RestrictedByPermissions>
  );
  return props.featureToggle ? (
    <ToggleFeature flag={props.featureToggle}>
      {permissionsWrapper}
    </ToggleFeature>
  ) : (
    permissionsWrapper
  );
};
ToggledWithPermissions.displayName = 'ToggledWithPermissions';
ToggledWithPermissions.propTypes = {
  featureToggle: PropTypes.string,
  permissions: PropTypes.arrayOf(
    PropTypes.shape({
      mode: PropTypes.string.isRequired,
      resource: PropTypes.string.isRequired,
    })
  ),
  children: PropTypes.element.isRequired,
};
export const getIconTheme = (menu, isActive) => {
  const baseIconTheme =
    menu.name.toLowerCase() === PLUGIN_NAMES.SETTINGS || menu.name === 'Support'
      ? 'grey'
      : 'white';
  if (isActive) return 'green';
  return baseIconTheme;
};
export class DataMenu extends React.PureComponent {
  static displayName = 'DataMenu';
  static propTypes = {
    rootNode: PropTypes.any,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        menu: PropTypes.shape({
          name: PropTypes.string.isRequired,
          labelKey: PropTypes.string.isRequired,
          link: PropTypes.string,
          externalLink: PropTypes.string,
          tracking: PropTypes.object,
          icon: PropTypes.string.isRequired,
          featureToggle: PropTypes.string,
          permissions: PropTypes.arrayOf(
            PropTypes.shape({
              mode: PropTypes.string.isRequired,
              resource: PropTypes.string.isRequired,
            })
          ),
          submenu: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string.isRequired,
              labelKey: PropTypes.string.isRequired,
              link: PropTypes.string.isRequired,
              featureToggle: PropTypes.string,
              permissions: PropTypes.arrayOf(
                PropTypes.shape({
                  mode: PropTypes.string.isRequired,
                  resource: PropTypes.string.isRequired,
                })
              ),
            })
          ),
        }),
      })
    ),
    projectKey: PropTypes.string.isRequired,
    isForcedMenuOpen: PropTypes.bool,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    useFullRedirectsForLinks: PropTypes.bool.isRequired,
  };
  state = {
    activeItemIndex: null,
    isExpanderVisible: true,
    isMenuOpen: false,
  };

  componentDidMount() {
    window.addEventListener('click', this.shouldCloseMenuFly, true);
    window.addEventListener('resize', this.checkSize);

    this.checkSize();
  }

  componentDidUpdate() {
    if (this.state.isMenuOpen) document.body.classList.add('body__menu-open');
    if (!this.state.isMenuOpen)
      document.body.classList.remove('body__menu-open');
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkSize);
    window.removeEventListener('click', this.shouldCloseMenuFly, true);
  }

  checkSize = () => {
    const shouldOpen = window.innerWidth > 1024;
    const canExpandMenu = window.innerWidth > 918;

    // If the screen is small, we should always keep the menu closed,
    // no matter the settings.
    if (!canExpandMenu) {
      if (this.state.isMenuOpen || this.state.isExpanderVisible)
        this.setState({
          // and resets the state to avoid conflicts
          isMenuOpen: false,
          isExpanderVisible: false,
          activeItemIndex: null,
        });
    } else if (canExpandMenu && this.state.isExpanderVisible !== true)
      this.setState({ isExpanderVisible: true });
    else if (
      isNil(this.props.isForcedMenuOpen) &&
      this.state.isMenuOpen !== shouldOpen
    )
      // User has no settings yet (this.props.isForcedMenuOpen === null)
      // We check the viewport size and:
      // - if screen is big, we open the menu
      // - if screen is small we close it
      this.setState({ isMenuOpen: shouldOpen, isExpanderVisible: true });
    else if (
      !isNil(this.props.isForcedMenuOpen) &&
      this.state.isMenuOpen !== this.props.isForcedMenuOpen
    )
      // User has setting, we should use that and ignore the screen size.
      // Note: if viewport size is small, we should ignore the user settings.
      this.setState({
        isMenuOpen: this.props.isForcedMenuOpen,
        isExpanderVisible: true,
      });
  };

  isMainMenuRouteActive = link => {
    const match = matchPath(this.props.location.pathname, {
      path: `/${this.props.projectKey}/${link}`,
      exact: false,
      strict: false,
    });
    return Boolean(match);
  };

  handleToggleItem = (event, index) => {
    const isTarget = getDataAttribute(event.target, 'data-target') === 'toggle';
    if (this.state.activeItemIndex !== index)
      this.setState({ activeItemIndex: index });
    else if (this.state.activeItemIndex === index && isTarget)
      this.setState({ activeItemIndex: null });
  };

  shouldCloseMenuFly = event => {
    if (
      this.props.rootNode &&
      !this.props.rootNode.contains(event.target) &&
      !this.state.isMenuOpen
    )
      this.setState({ activeItemIndex: null });
    else if (event.type === 'mouseleave')
      this.setState({ activeItemIndex: null });
  };

  handleToggleMenu = () => {
    if (this.state.isMenuOpen && this.state.activeItemIndex !== null)
      this.setState({ activeItemIndex: null });

    this.setState(prevState => {
      const nextIsMenuOpen = !prevState.isMenuOpen;
      storage.put(STORAGE_KEYS.IS_FORCED_MENU_OPEN, nextIsMenuOpen);
      return { isMenuOpen: nextIsMenuOpen };
    });
  };

  render() {
    const bottomMenuItems = ['Support'];
    return (
      <MenuGroup level={1}>
        {this.props.data.map(({ name, menu }, index) => {
          const isActive = this.state.activeItemIndex === index;
          const MenuIcon = Icons[menu.icon];
          return (
            <ToggledWithPermissions
              key={name}
              featureToggle={menu.featureToggle}
              permissions={menu.permissions}
            >
              <React.Fragment>
                {menu.name.toLowerCase() === PLUGIN_NAMES.SETTINGS && (
                  <MenuItemDivider />
                )}
                <MenuItem
                  hasSubmenu={Boolean(menu.submenu)}
                  isBottomItem={bottomMenuItems.indexOf(menu.name) >= 0}
                  isActive={isActive}
                  isMenuOpen={this.state.isMenuOpen}
                  onClick={event => {
                    this.handleToggleItem(event, index);
                  }}
                  onMouseEnter={
                    this.state.isMenuOpen
                      ? null
                      : event => this.handleToggleItem(event, index)
                  }
                  onMouseLeave={
                    this.state.isMenuOpen ? null : this.shouldCloseMenuFly
                  }
                >
                  <MenuItemLink
                    externalLink={menu.externalLink}
                    tracking={menu.tracking}
                    linkTo={
                      !this.state.isMenuOpen || !menu.submenu
                        ? `/${this.props.projectKey}/${menu.link}`
                        : null
                    }
                    useFullRedirectsForLinks={
                      this.props.useFullRedirectsForLinks
                    }
                  >
                    <div className={styles['item-icon-text']}>
                      <div className={styles.icon}>
                        <MenuIcon
                          size="scale"
                          theme={getIconTheme(
                            menu,
                            isActive || this.isMainMenuRouteActive(menu.link)
                          )}
                        />
                      </div>
                      <div
                        className={styles.title}
                        {...(this.state.isMenuOpen
                          ? { 'data-target': 'toggle' }
                          : {})}
                      >
                        <FormattedMessage {...messages[menu.labelKey]} />
                      </div>
                    </div>
                  </MenuItemLink>
                  <MenuGroup
                    level={2}
                    isActive={isActive}
                    isExpanded={this.state.isMenuOpen}
                  >
                    {menu.submenu
                      ? menu.submenu.map(submenu => (
                          <ToggledWithPermissions
                            key={`${name}-submenu-${submenu.name}`}
                            featureToggle={submenu.featureToggle}
                            permissions={submenu.permissions}
                          >
                            <li className={styles['sublist-item']}>
                              <div className={styles.text}>
                                <MenuItemLink
                                  linkTo={oneLineTrim`
                                    /${this.props.projectKey}
                                    /${submenu.link}
                                  `}
                                  exactMatch={true}
                                  useFullRedirectsForLinks={
                                    this.props.useFullRedirectsForLinks
                                  }
                                >
                                  <FormattedMessage
                                    {...messages[submenu.labelKey]}
                                  />
                                </MenuItemLink>
                              </div>
                            </li>
                          </ToggledWithPermissions>
                        ))
                      : null}
                  </MenuGroup>
                </MenuItem>
              </React.Fragment>
            </ToggledWithPermissions>
          );
        })}
        <MenuExpander
          isVisible={this.state.isExpanderVisible}
          onClick={this.handleToggleMenu}
        />
      </MenuGroup>
    );
  }
}

export class NavBar extends React.PureComponent {
  static displayName = 'NavBar';

  static propTypes = {
    // From parent
    projectKey: PropTypes.string.isRequired,
    useFullRedirectsForLinks: PropTypes.bool.isRequired,
    // Injected
    location: PropTypes.object.isRequired,
    isForcedMenuOpen: PropTypes.bool,
    projectPermissions: PropTypes.object.isRequired,
  };

  getNode = node => {
    this.node = node;
  };

  render() {
    return (
      <nav
        ref={this.getNode}
        className={styles['left-navigation']}
        data-test="left-navigation"
        data-track-component="Navigation"
      >
        <AppShellProviderForUserPermissions
          permissions={this.props.projectPermissions}
        >
          <DataMenu
            rootNode={this.node}
            data={defaultNavigationItems}
            isForcedMenuOpen={this.props.isForcedMenuOpen}
            location={this.props.location}
            projectKey={this.props.projectKey}
            useFullRedirectsForLinks={this.props.useFullRedirectsForLinks}
          />
        </AppShellProviderForUserPermissions>
      </nav>
    );
  }
}

export default compose(
  withRouter, // Connect again, to access the `location` object
  withProps(() => {
    const cachedIsForcedMenuOpen = storage.get(
      STORAGE_KEYS.IS_FORCED_MENU_OPEN
    );
    return {
      isForcedMenuOpen:
        typeof cachedIsForcedMenuOpen === 'string'
          ? cachedIsForcedMenuOpen === 'true'
          : null,
    };
  }),
  withProject(
    ownProps => ownProps.projectKey,
    projectData => ({
      projectPermissions: projectData.project
        ? omit(projectData.project.permissions, ['__typename'])
        : {},
    })
  )
)(NavBar);
