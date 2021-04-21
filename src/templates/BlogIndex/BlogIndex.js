import React from 'react';
import { graphql, Link, navigate } from 'gatsby';
import moment from 'moment';
import { GatsbyImage } from "gatsby-plugin-image";
import ReactPaginate from 'react-paginate';
import classNames from 'classnames';
import useMeasure from 'react-use-measure';
import { ResizeObserver } from '@juggle/resize-observer';

import Layout from '../../components/Layout/Layout';
import SEO from '../../components/seo';
import {
  list,
  date,
  headline,
  content,
  excerpt as excerptClass,
  thumbnail,
  pagination,
  selectedPage,
  hiddenBreak,
} from './BlogIndex.module.css';

const PaginationControls = ({ numPages, currentPage }) => {
  const [ref, bounds] = useMeasure({ polyfill: ResizeObserver });
  const mobile = bounds.width < 750;
  return (
    <nav
      className={pagination}
      role="navigation"
      aria-label="Pagination Navigation"
      ref={ref}
    >
      <ReactPaginate
        pageCount={numPages}
        pageRangeDisplayed={mobile ? 1 : 3}
        marginPagesDisplayed={mobile ? 0 : 1}
        breakClassName={classNames({ [hiddenBreak]: mobile })}
        previousLabel="˂"
        nextLabel="˃"
        initialPage={currentPage - 1}
        containerClassName={pagination}
        activeClassName={selectedPage}
        onPageChange={({ selected }) => {
          navigate(selected === 0 ? '/blog' : `/blog/${selected + 1}`);
        }}
      />
    </nav>
  );
};

/* eslint-disable react/no-danger */
export default ({ data, pageContext }) => (
  <Layout>
    <SEO title="Blog" />
    <h2>Blog</h2>
    <ol className={list}>
      {data.allMarkdownRemark.edges.map(
        ({ node: { fields, frontmatter, excerpt } }) => (
          <li key={fields.url}>
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
                <GatsbyImage
                  image={frontmatter.thumbnail.childImageSharp.gatsbyImageData}
                  className={thumbnail} />
              )}
            </div>
          </li>
        ),
      )}
    </ol>
    <PaginationControls {...pageContext} />
  </Layout>
);

export const query = graphql`query allBlogPosts($skip: Int!, $limit: Int!) {
  allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "^/posts/"}}
    sort: {fields: frontmatter___date, order: DESC}
    limit: $limit
    skip: $skip
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
              gatsbyImageData(width: 350, layout: CONSTRAINED)
            }
          }
        }
      }
    }
  }
}
`;
