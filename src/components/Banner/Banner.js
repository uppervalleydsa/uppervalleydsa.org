import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import moment from 'moment';

import { PreviewContext } from '../../constants';
import { banner } from './banner.module.css';

const query = graphql`
  query {
    markdownRemark(fileAbsolutePath: { regex: "/layout/banner.md$/" }) {
      html
      frontmatter {
        expires
      }
    }
  }
`;

const Banner = () => {
  const preview = useContext(PreviewContext);

  if (preview) return null;
  const data = useStaticQuery(query);
  const { html, frontmatter } = data.markdownRemark;
  const { expires } = frontmatter;

  if (window && moment().diff(expires) > 0) return null;

  // eslint-disable-next-line react/no-danger
  return <div className={banner} dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Banner;
