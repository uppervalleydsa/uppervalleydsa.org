import React from 'react';
import { graphql, Link } from 'gatsby';
import moment from 'moment';
import Img from 'gatsby-image/withIEPolyfill';

import Layout from '../components/Layout';
import SEO from '../components/seo';
import {
  list,
  date,
  headline,
  content,
  excerpt as excerptClass,
  thumbnail,
} from './blog.module.css';

/* eslint-disable react/no-danger */
const BlogIndex = ({ data }) => (
  <Layout>
    <SEO title="Blog" />
    <h2>Blog</h2>
    <ol className={list}>
      {data.allMarkdownRemark.edges.map(
        ({ node: { fields, frontmatter, excerpt } }) => (
          <li>
            <h3 className={headline}>
              <Link to={fields.url}>{frontmatter.title}</Link>
            </h3>
            <div className={content}>
              <div className={excerptClass}>
                <h4 className={date}>
                  {moment(frontmatter.date).format('LL')}
                </h4>
                <p>{excerpt}</p>
                <Link to={fields.url}>Read more →</Link>
              </div>
              {frontmatter.thumbnail && (
                <Img
                  className={thumbnail}
                  fluid={frontmatter.thumbnail.childImageSharp.fluid}
                />
              )}
            </div>
          </li>
        ),
      )}
    </ol>
  </Layout>
);

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "^/posts/" } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          fields {
            url
          }
          excerpt(pruneLength: 250)
          frontmatter {
            title
            date
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 350) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default BlogIndex;
