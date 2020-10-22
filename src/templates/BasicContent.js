import React, { useContext } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Signup from '../components/Signup';
import SEO from '../components/seo';
import { PreviewContext } from '../constants';

const widgetComponents = {
  Signup,
};

/* eslint-disable react/no-danger */
export default ({ data, children }) => {
  const { html, frontmatter } = data.markdownRemark;
  const { widgets, title, description } = frontmatter;

  const ifHtml = html ? { dangerouslySetInnerHTML: { __html: html } } : {};
  const requestedComponents = (widgets || []).map((name) =>
    React.createElement(widgetComponents[name], { key: name }),
  );

  const preview = useContext(PreviewContext);

  return (
    <>
      {!preview && <SEO title={title} description={description} />}
      <Layout>
        <div>
          <h1>{title}</h1>
          <div {...ifHtml}>{children}</div>
          {requestedComponents}
        </div>
      </Layout>
    </>
  );
};

export const query = graphql`
  query($url: String!) {
    markdownRemark(frontmatter: { url: { eq: $url } }) {
      html
      frontmatter {
        title
        description
        widgets
      }
    }
  }
`;
