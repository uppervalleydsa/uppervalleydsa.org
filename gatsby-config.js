const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const name = 'Upper Valley DSA';
const url =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000'
    : 'https://uppervalleydsa.org';
const description =
  'Upper Valley (Vermont and New Hampshire) chapter of the largest socialist organization in the United States.';
const privateRoutes = ['/members', '/admin/*'];

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
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'uploads',
        path: path.join(__dirname, 'static/uploads/'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: path.join(__dirname, 'content'),
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
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
            resolve: 'gatsby-remark-relative-images',
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 960,
            },
          },
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              icon: false,
              maintainCase: false,
              removeAccents: true,
            },
          },
        ],
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-netlify-cms',
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
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        exclude: privateRoutes,
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-174910115-1',
        exclude: ['/admin/**'],
      },
    },
    {
      resolve: 'gatsby-plugin-facebook-pixel',
      options: {
        pixelId: '768928687350834',
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        env: {
          production: {
            host: url,
            sitemap: `${url}/sitemap.xml`,
            policy: [
              {
                userAgent: '*',
                allow: '/',
                disallow: privateRoutes,
              },
            ],
          },
          'branch-deploy': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
          'deploy-preview': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
        },
      },
    },
    {
      resolve: `gatsby-source-stripe`,
      options: {
        objects: ['Price', 'Product'],
        secretKey: process.env.STRIPE_SECRET_KEY,
        downloadFiles: false,
      },
    },
  ],
};
