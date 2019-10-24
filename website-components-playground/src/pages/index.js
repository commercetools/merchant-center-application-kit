import React from 'react';
import { Link } from 'gatsby';

const Index = () => (
  <div>
    <h1>UI components playground</h1>
    <ul>
      <li>
        <Link to="confirmation-dialog">{'<ConfirmationDialog>'}</Link>
      </li>
    </ul>
  </div>
);

export default Index;
