const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Upper Valley DSA',
    description: 'Website for the Upper Valley DSA.',
    author: 'Upper Valley DSA',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src/images'),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content/`,
      },
    },
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: path.join(__dirname, 'src/custom-admin.js'),
      },
    },
  ],
};
