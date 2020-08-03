import React, { useContext } from 'react';
import { graphql } from 'gatsby';
import moment from 'moment';
import Img from 'gatsby-image/withIEPolyfill';

import Layout from '../components/Layout';
import SEO from '../components/seo';
import { PreviewContext } from '../constants';
import {
  author as authorClass,
  date as dateClass,
  thumbnail as thumbnailClass,
} from './templates.module.css';

/* eslint-disable react/no-danger */
export default ({ data, children }) => {
  const { html, frontmatter } = data.markdownRemark;
  const { title, author, date, thumbnail } = frontmatter;

  const ifHtml = html ? { dangerouslySetInnerHTML: { __html: html } } : {};
  const preview = useContext(PreviewContext);

  return (
    <>
      {!preview && <SEO title={title} />}
      <Layout>
        <div>
          <h1>{title}</h1>
          <div>
            <h2 className={authorClass}>{author}</h2>
            <h3 className={dateClass}>{moment(date).format('LL')}</h3>
          </div>
          {thumbnail && thumbnail.childImageSharp && (
            <Img
              className={thumbnailClass}
              fluid={thumbnail.childImageSharp.fluid}
            />
          )}
          {thumbnail && !thumbnail.childImageSharp && (
            // we are inside the preview editor. sucks to have to do this
            <img src={thumbnail} className={thumbnailClass} alt="" />
          )}
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
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 650) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
