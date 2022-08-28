/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { getSrc } from 'gatsby-plugin-image';

import logo from '../images/logo-noborder.png';

const SEO = ({ description, lang, meta, title, image }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `,
  );

  const metaDescription = description || site.siteMetadata.description;
  let ogImage;
  if (!image) {
    ogImage = logo;
  } else if (typeof image === 'string') {
    ogImage = image;
  } else {
    ogImage = getSrc(image.childImageSharp.gatsbyImageData);
  }

  const schemaOrgJSONLD = {
    '@context': 'http://www.schema.org',
    '@type': 'Organization',
    name: site.siteMetadata.title,
    url: 'uppervalleydsa.org',
    description: site.siteMetadata.description,
  };

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          property: 'og:image',
          content: ogImage,
        },
      ].concat(meta)}
    >
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  );
};

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
  image: logo,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  // PropTypes.object is logical here - meta props can be totally arbitrary
  // eslint-disable-next-line react/forbid-prop-types
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      childImageSharp: PropTypes.shape,
    }),
  ]),
};

export default SEO;
