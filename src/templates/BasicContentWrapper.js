import React from 'react';
import { graphql } from 'gatsby';

import BasicContent from './BasicContent';

export default ({ data }) => {
  const post = data.markdownRemark;
  return <BasicContent title={post.frontmatter.title} html={post.html} />;
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
