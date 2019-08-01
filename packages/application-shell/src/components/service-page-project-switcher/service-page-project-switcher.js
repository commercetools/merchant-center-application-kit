import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import styled from '@emotion/styled';
import ProjectSwitcher from '../project-switcher';
import FetchUser from '../fetch-user';

const Container = styled.div`
  width: 200px;
  text-align: left;
  margin: 0 auto;
`;

export const ServicePageProjectSwitcher = props => (
  <Container>
    <FetchUser>
      {({ isLoading, user }) =>
        !isLoading && user && user.projects.total > 0 ? (
          <ProjectSwitcher
            // In this case it's not necessary to check if the `projectKey` param
            // is included in the list of projects. In such case
            // the dropdown will still be rendered but no project will be selected.
            // This is fine becase the user has still the possibility to "switch"
            // to a project.
            projectKey={props.match.params.projectKey}
            total={user.projects.total}
          />
        ) : null
      }
    </FetchUser>
  </Container>
);
ServicePageProjectSwitcher.displayName = 'ServicePageProjectSwitcher';
ServicePageProjectSwitcher.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectKey: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withRouter(ServicePageProjectSwitcher);
