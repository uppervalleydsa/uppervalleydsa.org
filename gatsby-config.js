const path = require('path');

const name = 'Upper Valley DSA';
const url = 'https://uppervalleydsa.org';
const description =
  'Upper Valley (Vermont and New Hampshire) chapter of the largest socialist organization in the United States.';

module.exports = {
  siteMetadata: {
    title: name,
    description,
    author: name,
    siteUrl: url,
  },
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `uploads`,
        path: path.join(__dirname, 'static/uploads/'),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: path.join(__dirname, 'content'),
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-relative-images`,
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960,
            },
          },
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: path.join(__dirname, 'src/custom-admin.js'),
      },
    },
    {
      resolve: 'gatsby-plugin-favicon',
      options: {
        appName: name,
        appDescription: description,
        logo: './src/images/logo-noborder.png',
      },
    },
    'gatsby-plugin-sitemap',
  ],
};
