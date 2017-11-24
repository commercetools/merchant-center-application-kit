import React from 'react';
import { shallow } from 'enzyme';
import { WithProject, withProject, ProjectQuery } from './with-project';

describe('rendering', () => {
  let props;
  let wrapper;

  describe('<WithProject>', () => {
    describe('when mapDataToProps is not defined', () => {
      beforeEach(() => {
        props = {
          projectKey: 'my-project',
          render: jest.fn(),
          // this is usually injected by graphql
          projectData: {
            loading: false,
            project: {
              name: 'My Project',
            },
          },
        };
        wrapper = shallow(<WithProject foo="bar" {...props} />);
      });
      it('should call render with projectData object', () => {
        expect(props.render).toHaveBeenCalledWith(
          expect.objectContaining({ projectData: props.projectData })
        );
      });
      it('should proxy parent props to render', () => {
        expect(props.render).toHaveBeenCalledWith(
          expect.objectContaining({ foo: 'bar' })
        );
      });
    });
    describe('when mapDataToProps is defined', () => {
      beforeEach(() => {
        props = {
          projectKey: 'my-project',
          mapDataToProps: projectData => ({
            name: projectData.project && projectData.project.name,
          }),
          render: jest.fn(),
          // this is usually injected by graphql
          projectData: {
            loading: false,
            project: {
              name: 'My Project',
            },
          },
        };
        wrapper = shallow(<WithProject foo="bar" {...props} />);
      });
      it('should call render with mapped prop name', () => {
        expect(props.render).toHaveBeenCalledWith(
          expect.objectContaining({ name: 'My Project' })
        );
      });
      it('should call render without projectData object', () => {
        expect(props.render).not.toHaveBeenCalledWith(
          expect.objectContaining({ projectData: props.projectData })
        );
      });
      it('should proxy parent props to render', () => {
        expect(props.render).toHaveBeenCalledWith(
          expect.objectContaining({ foo: 'bar' })
        );
      });
    });
  });

  describe('withProject()', () => {
    let wrapperRender;
    // eslint-disable-next-line react/prop-types
    const ProjectTitle = ({ name }) => <div>{name}</div>;

    beforeEach(() => {
      const ProfileTitleWithProject = withProject(
        ownProps => ownProps.projectKey
      )(ProjectTitle);
      wrapper = shallow(
        <ProfileTitleWithProject foo="bar" projectKey="my-project" />
      );
      wrapperRender = shallow(wrapper.prop('render')({ name: 'My Project' }));
    });
    it('should render <ProjectTitle> with name', () => {
      expect(wrapperRender).toMatchElement(<div>{'My Project'}</div>);
    });
    it('should render WithProject internally', () => {
      expect(wrapper).toRender('WithProject');
    });
  });

  describe('graphql query', () => {
    it('should match snapshot', () => {
      expect(ProjectQuery).toMatchSnapshot();
    });
  });
});
