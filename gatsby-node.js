const { createFilePath } = require(`gatsby-source-filesystem`);
const moment = require('moment');

exports.onCreateNode = ({ node, getNode, actions }) => {
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

  const allBlogs = blogPages.allMarkdownRemark.edges;
  const postsPerPage = 6;
  const numPages = Math.ceil(allBlogs.length / postsPerPage);

  // blog pagination entries
  Array.from({ length: numPages }).forEach((_, i) => {
    actions.createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: require.resolve('./src/templates/BlogIndex'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });

  actions.createPage({
    path: '/blog/1',
    component: require.resolve(`./src/templates/Redirect.js`),
    context: { to: '/blog' },
  });

  // individual blog pages
  allBlogs.forEach(({ node }) => {
    const {
      fields: { filepath, url },
    } = node;

    actions.createPage({
      path: url,
      component: require.resolve(`./src/templates/BlogEntry.js`),
      context: { filepath },
    });
  });

  // shortlinks
  const { data: shortlinks } = await graphql(/* GraphQL */ `
    query {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "^/links/" } }) {
        edges {
          node {
            frontmatter {
              from
              to
            }
          }
        }
      }
    }
  `);

  shortlinks.allMarkdownRemark.edges.forEach(({ node }) => {
    const {
      frontmatter: { from, to },
    } = node;

    actions.createPage({
      path: from,
      component: require.resolve(`./src/templates/Redirect.js`),
      context: { to },
    });
  });
};
