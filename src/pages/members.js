import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/seo';
import {} from './blog.module.css';

/* eslint-disable react/no-danger */
const Members = () => (
  <Layout>
    <SEO title="Members" />
    <h2>Members</h2>
  </Layout>
);

export const query = graphql`
  query {
    site {
      buildTime
    }
  }
`;

export default Members;
