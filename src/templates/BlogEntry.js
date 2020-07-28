import React, { useContext } from 'react';
import { graphql } from 'gatsby';
import moment from 'moment';

import Layout from '../components/Layout';
import SEO from '../components/seo';
import { PreviewContext } from '../constants';
import {
  author as authorClass,
  date as dateClass,
} from './templates.module.css';

/* eslint-disable react/no-danger */
export default ({ data, children }) => {
  const { html, frontmatter } = data.markdownRemark;
  const { title, author, date } = frontmatter;

  const ifHtml = html ? { dangerouslySetInnerHTML: { __html: html } } : {};
  const preview = useContext(PreviewContext);

  return (
    <>
      {!preview && <SEO title={title} />}
      <Layout>
        <div>
          <h1>{title}</h1>
          <h2 className={authorClass}>{author}</h2>
          <h3 className={dateClass}>{moment(date).format('LL')}</h3>
          <div {...ifHtml}>{children}</div>
        </div>
      </Layout>
    </>
  );
};

export const query = graphql`
  query($filepath: String!) {
    markdownRemark(fields: { filepath: { eq: $filepath } }) {
      html
      frontmatter {
        title
        author
        date
      }
    }
  }
`;
