import { shallow } from 'enzyme';
import React from 'react';
import Select from 'react-select';
import { ProjectSwitcher } from './project-switcher';

const createProjectsQuery = custom => ({
  loading: false,
  user: {
    projects: {
      results: [
        {
          key: 'key4',
          name: 'name4',
          suspension: { isActive: false },
          expiry: { isActive: false },
        },
        {
          key: 'key2',
          name: 'name2',
          suspension: { isActive: false },
          expiry: { isActive: false },
        },
        {
          key: 'key1',
          name: 'name1',
          suspension: { isActive: false },
          expiry: { isActive: false },
        },
        {
          key: 'key3',
          name: 'name3',
          suspension: { isActive: false },
          expiry: { isActive: false },
        },
      ],
    },
  },

  ...custom,
});

const createTestProps = props => ({
  projectKey: 'key1',
  total: 4,
  projectsQuery: createProjectsQuery(),
  intl: { formatMessage: jest.fn() },
  ...props,
});

describe('rendering', () => {
  let wrapper;
  let props;

  describe('when loading', () => {
    beforeEach(() => {
      props = createTestProps({
        projectsQuery: createProjectsQuery({
          loading: true,
        }),
      });
      wrapper = shallow(<ProjectSwitcher {...props} />);
    });

    it('should not render a `<Select>`', () => {
      expect(wrapper).not.toRender(Select);
    });
  });

  describe('without `user` in `projectsQuery`', () => {
    beforeEach(() => {
      props = createTestProps({
        projectsQuery: createProjectsQuery({
          user: null,
        }),
      });
      wrapper = shallow(<ProjectSwitcher {...props} />);
    });

    it('should render a `<Select>`', () => {
      expect(wrapper).toRenderElementTimes(Select, 1);
    });

    it('should pass empty `options` to `<Select>`', () => {
      expect(wrapper.find(Select)).toHaveProp('options', null);
    });
  });

  describe('when loaded', () => {
    let valueRenderer;
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<ProjectSwitcher {...props} />);
      valueRenderer = wrapper.find(Select).prop('valueRenderer')();
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a `<Select>`', () => {
      expect(wrapper).toRenderElementTimes(Select, 1);
    });

    it('should render a `<Select>` with the value set to the current project', () => {
      expect(wrapper.find(Select).prop('value')).toBe(props.projectKey);
    });

    it('should render the current name in the selector', () => {
      const selectedName = valueRenderer.props.children[0];
      expect(selectedName.props.children).toBe('name1');
    });

    it('should render the number of projects in the selector', () => {
      const projectNumber = valueRenderer.props.children[1];
      expect(projectNumber.props.children).toBe(
        props.projectsQuery.user.projects.results.length
      );
    });

    describe('dropdown option item', () => {
      describe('project is not expired or suspended', () => {
        let optionWrapper;
        beforeEach(() => {
          optionWrapper = shallow(
            wrapper.instance().handleRenderItemName({
              name: 'Project A',
              key: 'project-a',
              expiry: { isActive: false },
              suspension: { isActive: false },
            })
          );
        });
        it('should render item name', () => {
          expect(optionWrapper.find('.item-text-main')).toIncludeText(
            'Project A'
          );
        });
        it('should render item key', () => {
          expect(optionWrapper.find('.item-text-small').at(0)).toIncludeText(
            'project-a'
          );
        });
        it('should not render suspended message', () => {
          expect(optionWrapper).not.toRender('FormattedMessage');
        });
        it('should not render expired message', () => {
          expect(optionWrapper).not.toRender('FormattedMessage');
        });
      });
      describe('project is has suspension', () => {
        let optionWrapper;
        beforeEach(() => {
          optionWrapper = shallow(
            wrapper.instance().handleRenderItemName({
              name: 'Project A',
              key: 'project-a',
              expiry: { isActive: false },
              suspension: { isActive: true },
            })
          );
        });
        it('should render item name', () => {
          expect(
            optionWrapper.find('.item-text-main.item-text-disabled')
          ).toIncludeText('Project A');
        });
        it('should render `ErrorIcon`', () => {
          expect(optionWrapper).toRender('ErrorIcon');
        });
        it('should render item key', () => {
          expect(
            optionWrapper.find('.item-text-small.item-text-disabled')
          ).toIncludeText('project-a');
        });
        it('should render suspended message', () => {
          expect(optionWrapper).toRender({ id: 'ProjectSwitcher.suspended' });
        });
        it('should not render expired message', () => {
          expect(optionWrapper).not.toRender({ id: 'ProjectSwitcher.expired' });
        });
      });
      describe('project is expired', () => {
        let optionWrapper;
        beforeEach(() => {
          optionWrapper = shallow(
            wrapper.instance().handleRenderItemName({
              name: 'Project A',
              key: 'project-a',
              expiry: { isActive: true },
              suspension: {
                isActive: false,
              },
            })
          );
        });
        it('should render item name', () => {
          expect(
            optionWrapper.find('.item-text-main.item-text-disabled')
          ).toIncludeText('Project A');
        });
        it('should render `ErrorIcon`', () => {
          expect(optionWrapper).toRender('ErrorIcon');
        });
        it('should render item key', () => {
          expect(
            optionWrapper.find('.item-text-small.item-text-disabled')
          ).toIncludeText('project-a');
        });
        it('should render expired message', () => {
          expect(optionWrapper).toRender({ id: 'ProjectSwitcher.expired' });
        });
        it('should not render suspended message', () => {
          expect(optionWrapper).not.toRender({
            id: 'ProjectSwitcher.suspended',
          });
        });
      });
    });
  });
});

describe('callbacks', () => {
  describe('selecting a project from the list', () => {
    let wrapper;
    let props;

    describe('when the user selects a different project from the current one', () => {
      let replace;
      beforeEach(() => {
        replace = jest.fn();
        delete window.location;
        window.location = { replace };
        props = createTestProps();
        wrapper = shallow(<ProjectSwitcher {...props} />);
        wrapper.find(Select).simulate('change', { key: 'key2' });
      });
      it('should redirect to the new project url', () => {
        expect(replace).toHaveBeenCalledTimes(1);
        expect(replace).toHaveBeenLastCalledWith('/key2');
      });
    });

    describe('when the user selects same project as the current one', () => {
      let replace;
      beforeEach(() => {
        replace = jest.fn();
        delete window.location;
        window.location = { replace };
        props = createTestProps({ projectKey: 'key1' });
        wrapper = shallow(<ProjectSwitcher {...props} />);
        wrapper.find(Select).simulate('change', { key: 'key1' });
      });
      it('should not redirect to the new project', () => {
        expect(replace).toHaveBeenCalledTimes(0);
      });
    });
  });
});
