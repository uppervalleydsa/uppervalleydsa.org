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
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-netlify-cms',
  ],
};
