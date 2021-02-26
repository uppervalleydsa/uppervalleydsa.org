import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import moment from 'moment';

import { PreviewContext } from '../../constants';
import useIsClient from '../../utils/useIsClient';
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
  const client = useIsClient();

  // Don't render these in the preview (CMS), or on the server
  if (!client || preview) return null;
  const data = useStaticQuery(query);
  const { html, frontmatter } = data.markdownRemark;
  const { expires } = frontmatter;

  if (moment().diff(expires) > 0) return null;

  // eslint-disable-next-line react/no-danger
  return <div className={banner} dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Banner;
