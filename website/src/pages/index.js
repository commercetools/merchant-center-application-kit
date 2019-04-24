import React from 'react';
import { Link } from 'gatsby';
import pkg from '../../package.json';
import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';

const IndexPage = () => (
  <Layout showSidebar={false}>
    <SEO title="Home" keywords={pkg.keywords} />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);
IndexPage.displayName = 'IndexPage';

export default IndexPage;
