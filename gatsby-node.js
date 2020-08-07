const { createFilePath } = require(`gatsby-source-filesystem`);
const { fmImagesToRelative } = require('gatsby-remark-relative-images');
const moment = require('moment');

exports.onCreateNode = ({ node, getNode, actions }) => {
  // for gatsby-remark-relative-images
  // see: https://www.gatsbyjs.org/packages/gatsby-remark-relative-images/#to-convert-frontmatter-images
  fmImagesToRelative(node);

  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const filepath = createFilePath({ node, getNode, basePath: `posts` });
    const formattedDate = moment(node.frontmatter.date).format('YYYY-MM-DD');

    createNodeField({
      node,
      name: 'filepath',
      value: filepath,
    });

    createNodeField({
      node,
      name: 'url',
      value: `/blog/${formattedDate}-${filepath.substr(1)}`,
    });
  }
};

exports.createPages = async ({ actions, graphql }) => {
  // Content pages
  const { data: contentPages } = await graphql(/* GraphQL */ `
    query {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "^/pages/" } }) {
        nodes {
          html
          frontmatter {
            url
            title
          }
        }
      }
    }
  `);

  contentPages.allMarkdownRemark.nodes.forEach((page) => {
    const { url } = page.frontmatter;
    actions.createPage({
      path: url,
      component: require.resolve(`./src/templates/BasicContent.js`),
      context: { url },
    });
  });

  // Blog pages
  const { data: blogPages } = await graphql(/* GraphQL */ `
    query {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "^/posts/" } }) {
        edges {
          node {
            fields {
              filepath
              url
            }
          }
        }
      }
    }
  `);

  blogPages.allMarkdownRemark.edges.forEach(({ node }) => {
    const {
      fields: { filepath, url },
    } = node;

    actions.createPage({
      path: url,
      component: require.resolve(`./src/templates/BlogEntry.js`),
      context: { filepath },
    });
  });
};
