import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/seo';

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <div __dangerouslySetInnerHtml={{ __html: data.markdownRemark.html }} />
  </Layout>
);

export const query = graphql`
  query {
    markdownRemark(fileAbsolutePath: { regex: "/layout/home.md$/" }) {
      html
    }
  }
`;

export default IndexPage;
