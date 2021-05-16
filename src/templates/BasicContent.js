import React, { useContext } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Signup from '../components/Signup';
import SEO from '../components/seo';
import { PreviewContext } from '../constants';

const widgetComponents = {
  Signup,
};

const findRespImageLink = (ast) => {
  if (
    ast.tagName === 'a' &&
    ast.properties &&
    ast.properties.className &&
    ast.properties.className.includes('gatsby-resp-image-link')
  ) {
    return ast.properties.href;
  }

  if (!ast.children) return undefined;

  // eslint-disable-next-line no-restricted-syntax
  return ast.children.reduce((prev, child) => {
    const result = findRespImageLink(child);
    if (!prev && result) {
      return result;
    }
    return prev;
  }, undefined);
};

/* eslint-disable react/no-danger */
const BasicContent = ({ data, children }) => {
  const { html, htmlAst, frontmatter } = data.markdownRemark;
  const { widgets, title, description, css } = frontmatter;

  const ifHtml = html ? { dangerouslySetInnerHTML: { __html: html } } : {};
  const requestedComponents = (widgets || []).map((name) =>
    React.createElement(widgetComponents[name], { key: name }),
  );

  const preview = useContext(PreviewContext);

  let image;
  if (!preview) {
    image = findRespImageLink(htmlAst);
  }

  return (
    <>
      <style type="text/css">{css}</style>
      {!preview && (
        <SEO title={title} description={description} image={image} />
      )}
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
  query ($url: String!) {
    markdownRemark(frontmatter: { url: { eq: $url } }) {
      html
      htmlAst
      frontmatter {
        css
        title
        description
        widgets
      }
    }
  }
`;

export default BasicContent;
