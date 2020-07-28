import React from 'react';
import { graphql } from 'gatsby';
import moment from 'moment';

import Layout from '../components/Layout';
import SEO from '../components/seo';
import {
  list,
  date,
  headline,
  excerpt as excerptClass,
} from './blog.module.css';

/* eslint-disable react/no-danger */
const BlogIndex = ({ data }) => (
  <Layout>
    <SEO title="Blog Posts" />
    <h2>Blog posts</h2>
    <ol className={list}>
      {data.allMarkdownRemark.edges.map(
        ({ node: { fields, frontmatter, excerpt } }) => (
          <li>
            <h3 className={headline}>
              <a href={fields.url}>{frontmatter.title}</a>
            </h3>
            <h4 className={date}>{moment(frontmatter.date).format('LL')}</h4>

            <p className={excerptClass}>{excerpt}</p>
          </li>
        ),
      )}
    </ol>
  </Layout>
);

export const query = graphql`
  query {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "^/blog/" } }) {
      edges {
        node {
          fields {
            url
          }
          excerpt(pruneLength: 250)
          frontmatter {
            title
            date
          }
        }
      }
    }
  }
`;

export default BlogIndex;
