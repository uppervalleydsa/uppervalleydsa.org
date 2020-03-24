exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    query ContentPages {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/content/" } }) {
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

  data.allMarkdownRemark.nodes.forEach((node) => {
    const { url, title } = node.frontmatter;
    const { html } = node;
    actions.createPage({
      path: url,
      component: require.resolve(`./src/templates/ContentPage.js`),
      context: { html, title, url },
    });
  });
};
