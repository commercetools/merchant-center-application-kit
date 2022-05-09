import type { ReactNode } from 'react';
import { Route, Switch } from 'react-router-dom';

type NestedPage = {
  path: string;
  spec: ReactNode;
};
type NestedPagesProps = {
  title: string;
  basePath: string;
  pages: NestedPage[];
};

const NestedPages = (props: NestedPagesProps) => (
  <Switch>
    {props.pages.map(({ path, spec }) => (
      <Route key={path} path={`${props.basePath}/${path}`}>
        {spec}
      </Route>
    ))}
    <Route>
      <div>
        <h1>{props.title}</h1>
        <a href="/">{'All components'}</a>
        <ul>
          {props.pages.map(({ path }) => (
            <li key={path}>
              <a href={`${props.basePath}/${path}`}>{path}</a>
            </li>
          ))}
        </ul>
      </div>
    </Route>
  </Switch>
);

export default NestedPages;
