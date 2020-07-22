const { createFilePath } = require(`gatsby-source-filesystem`);
const moment = require('moment');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `blog` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
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
              slug
            }
            frontmatter {
              date
            }
          }
        }
      }
    }
  `);

  data.allMarkdownRemark.edges.forEach(({ node }) => {
    const {
      frontmatter: { date },
      fields: { slug },
    } = node;
    const formattedDate = moment(date).format('YYYY-MM-DD');

    actions.createPage({
      path: `/blog/${formattedDate}-${slug.substr(1)}`,
      component: require.resolve(`./src/templates/BlogEntry.js`),
      context: { slug },
    });
  });
};
