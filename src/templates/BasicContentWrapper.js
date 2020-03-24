import React from 'react';
import { graphql } from 'gatsby';

import BasicContent from './BasicContent';
import SEO from '../components/seo';

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <>
      <SEO title={post.frontmatter.title} />
      <BasicContent title={post.frontmatter.title} html={post.html} />
    </>
  );
};

export const query = graphql`
  query($url: String!) {
    markdownRemark(frontmatter: { url: { eq: $url } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
