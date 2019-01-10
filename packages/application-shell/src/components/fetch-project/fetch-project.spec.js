import React from 'react';
import { shallow } from 'enzyme';
import {
  FetchProject,
  withProject,
  mapAllAppliedToObjectShape,
} from './fetch-project';

describe('rendering', () => {
  let props;
  let wrapper;

  describe('<FetchProject>', () => {
    beforeEach(() => {
      props = {
        projectKey: 'my-project',
        children: jest.fn(),
        // this is usually injected by graphql
        projectData: {
          isLoading: false,
          project: {
            name: 'My Project',
          },
        },
      };
      wrapper = shallow(<FetchProject {...props} />);
    });
    it('should call children with projectData object', () => {
      expect(props.children).toHaveBeenCalledWith(props.projectData);
    });
  });

  describe('withProject()', () => {
    let wrapperRender;

    describe('when mapDataToProps is defined', () => {
      beforeEach(() => {
        // eslint-disable-next-line react/prop-types
        const ProjectTitle = ({ name }) => <div>{name}</div>;
        const ProfileTitleWithProject = withProject(
          ownProps => ownProps.projectKey,
          projectData => ({ name: projectData.project.name })
        )(ProjectTitle);
        wrapper = shallow(
          <ProfileTitleWithProject foo="bar" projectKey="my-project" />
        );
        wrapperRender = shallow(
          wrapper.prop('children')({ project: { name: 'My Project' } })
        );
      });
      it('should render <ProjectTitle> with name', () => {
        expect(wrapperRender).toMatchElement(<div>{'My Project'}</div>);
      });
      it('should render FetchProject internally', () => {
        expect(wrapper).toRender('FetchProject');
      });
    });
    describe('when mapDataToProps is not defined', () => {
      beforeEach(() => {
        // eslint-disable-next-line react/prop-types
        const ProjectTitle = ({ project }) => <div>{project.name}</div>;
        const ProfileTitleWithProject = withProject(
          ownProps => ownProps.projectKey
        )(ProjectTitle);
        wrapper = shallow(
          <ProfileTitleWithProject foo="bar" projectKey="my-project" />
        );
        wrapperRender = shallow(
          wrapper.prop('children')({ project: { name: 'My Project' } })
        );
      });
      it('should render <ProjectTitle> with name', () => {
        expect(wrapperRender).toMatchElement(<div>{'My Project'}</div>);
      });
      it('should render FetchProject internally', () => {
        expect(wrapper).toRender('FetchProject');
      });
    });
  });
});

describe('helpers', () => {
  describe('mapAllAppliedToObjectShape', () => {
    const allAppliedPermissions = [
      {
        name: 'manageProject',
        value: true,
      },
    ];

    it('should transform all permissions', () => {
      const firstAppliedPermission = allAppliedPermissions[0];
      expect(mapAllAppliedToObjectShape(allAppliedPermissions)).toEqual(
        expect.objectContaining({
          [firstAppliedPermission.name]: firstAppliedPermission.value,
        })
      );
    });
  });
});
