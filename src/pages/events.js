import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import FbEmbed from '../components/FbEmbed';
import SEO from '../components/seo';

/* eslint-disable react/no-danger */
const Events = ({ data }) => (
  <Layout>
    <SEO title="Events" />
    <h2>Events</h2>
    <div
      dangerouslySetInnerHTML={{
        __html: data.markdownRemark ? data.markdownRemark.html : '',
      }}
    />
    <FbEmbed tabs={['events']} />
  </Layout>
);

export const query = graphql`
  query {
    markdownRemark(fileAbsolutePath: { regex: "/layout/events.md$/" }) {
      html
    }
  }
`;

export default Events;
