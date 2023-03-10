import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import ProjectSwitcher from '../project-switcher';

type Params = {
  projectKey: string;
};

const Container = styled.div`
  width: 200px;
  text-align: left;
  margin: 0 auto;
`;

export const ServicePageProjectSwitcher = () => {
  const params = useParams<Params>();
  const numberOfProjects = useApplicationContext(
    (context) => (context.user && context.user.projects.total) || 0
  );
  if (numberOfProjects === 0) return null;
  return (
    <Container>
      <ProjectSwitcher
        // In this case it's not necessary to check if the `projectKey` param
        // is included in the list of projects. In such case
        // the dropdown will still be rendered but no project will be selected.
        // This is fine becase the user has still the possibility to "switch"
        // to a project.
        projectKey={params.projectKey}
      />
    </Container>
  );
};
ServicePageProjectSwitcher.displayName = 'ServicePageProjectSwitcher';

export default ServicePageProjectSwitcher;
