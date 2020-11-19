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
            resolve: 'gatsby-remark-embed-video',
            options: {
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              related: false, // Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, // Optional: Disable insertion of <style> border: 0
              urlOverrides: [
                {
                  id: 'youtube',
                  embedURL: (videoId) =>
                    `https://www.youtube.com/embed/${videoId}`,
                },
              ],
            },
          },
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
        manualInit: true,
        enableIdentityWidget: false,
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
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-174910115-1',
        exclude: ['/admin/**'],
      },
    },
  ],
};
