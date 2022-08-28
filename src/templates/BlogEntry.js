import React, { useContext } from 'react';
import { graphql, Link } from 'gatsby';
import moment from 'moment';
import { GatsbyImage } from 'gatsby-plugin-image';

import Layout from '../components/Layout';
import SEO from '../components/seo';
import { PreviewContext } from '../constants';
import {
  author as authorClass,
  date as dateClass,
  thumbnail as thumbnailClass,
} from './templates.module.css';

/* eslint-disable react/no-danger */
const BlogEntry = ({ data, children }) => {
  const { html, frontmatter, excerpt } = data.markdownRemark;
  const { title, author, date, thumbnail, note } = frontmatter;

  const ifHtml = html ? { dangerouslySetInnerHTML: { __html: html } } : {};
  const preview = useContext(PreviewContext);

  return (
    <>
      {!preview && (
        <SEO title={title} description={excerpt} image={thumbnail} />
      )}
      <Layout>
        <div>
          <h1>{title}</h1>
          <div>
            <h2 className={authorClass}>{author}</h2>
            <h3 className={dateClass}>{moment(date).format('LL')}</h3>
          </div>
          {thumbnail && thumbnail.childImageSharp && (
            <GatsbyImage
              image={thumbnail.childImageSharp.gatsbyImageData}
              className={thumbnailClass}
            />
          )}
          {thumbnail && !thumbnail.childImageSharp && (
            // we are inside the preview editor. sucks to have to do this
            <img src={thumbnail} className={thumbnailClass} alt="" />
          )}
          {note && (
            <p>
              <i>{note}</i>
            </p>
          )}
          <div {...ifHtml}>{children}</div>
          <p>
            <Link to="/blog">← Back to all posts</Link>
          </p>
        </div>
      </Layout>
    </>
  );
};

export const query = graphql`
  query ($filepath: String!) {
    markdownRemark(fields: { filepath: { eq: $filepath } }) {
      html
      excerpt(pruneLength: 250)
      frontmatter {
        title
        author
        date
        note
        thumbnail {
          childImageSharp {
            gatsbyImageData(width: 650, layout: CONSTRAINED)
          }
        }
      }
    }
  }
`;

export default BlogEntry;
