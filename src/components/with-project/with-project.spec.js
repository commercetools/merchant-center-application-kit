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
          children: jest.fn(),
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
      it('should call children with projectData object', () => {
        expect(props.children).toHaveBeenCalledWith(
          expect.objectContaining(props.projectData)
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
          children: jest.fn(),
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
      it('should call children with mapped prop name', () => {
        expect(props.children).toHaveBeenCalledWith(
          expect.objectContaining({ name: 'My Project' })
        );
      });
      it('should call children without projectData object', () => {
        expect(props.children).not.toHaveBeenCalledWith(
          expect.objectContaining(props.projectData)
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
      wrapperRender = shallow(wrapper.prop('children')({ name: 'My Project' }));
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
