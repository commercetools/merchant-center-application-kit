import type { ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';

type NestedPage = {
  path: string;
  name?: string;
  spec: ReactNode;
};
type NestedPagesProps = {
  title: string;
  basePath: string;
  pages: NestedPage[];
};

const NestedPages = (props: NestedPagesProps) => (
  <Routes>
    {props.pages.map(({ path, spec }) => (
      <Route key={path} path={`${props.basePath}/${path}`} element={spec} />
    ))}
    <Route
      element={
        <div>
          <h1>{props.title}</h1>
          <a href="/">{'All components'}</a>
          <ul>
            {props.pages.map(({ path, name }) => (
              <li key={path}>
                <a href={`${props.basePath}/${path}`}>{name || path}</a>
              </li>
            ))}
          </ul>
        </div>
      }
    />
  </Routes>
);

export default NestedPages;
