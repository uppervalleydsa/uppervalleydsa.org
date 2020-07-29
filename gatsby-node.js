const { createFilePath } = require(`gatsby-source-filesystem`);
const moment = require('moment');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

exports.onCreateNode = ({ node, getNode, actions }) => {
  // for gatsby-remark-relative-images
  // see: https://www.gatsbyjs.org/packages/gatsby-remark-relative-images/#to-convert-frontmatter-images
  fmImagesToRelative(node);

  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const filepath = createFilePath({ node, getNode, basePath: `blog` });
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
  const getNetlifyPage = async (pageName) => {
    const { data } = await graphql(/* GraphQL */ `
      query {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/pages/${pageName}.md$/" } }
        ) {
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
    return data.allMarkdownRemark.nodes[0];
  };

  const createBasicPage = async (pageName) => {
    const page = await getNetlifyPage(pageName);
    const { url } = page.frontmatter;
    actions.createPage({
      path: url,
      component: require.resolve(`./src/templates/BasicContent.js`),
      context: { url },
    });
  };

  await createBasicPage('about');
  await createBasicPage('contact');
  await createBasicPage('organizing');

  // Blog pages
  const { data } = await graphql(/* GraphQL */ `
    query {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "^/blog/" } }) {
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

  data.allMarkdownRemark.edges.forEach(({ node }) => {
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
