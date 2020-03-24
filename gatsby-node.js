exports.createPages = async ({ actions, graphql }) => {
  const getNetlifyPage = async (pageName) => {
    const { data } = await graphql(`
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
    const { url, title } = page.frontmatter;
    const { html } = page;
    actions.createPage({
      path: url,
      component: require.resolve(`./src/templates/BasicContentWrapper.js`),
      context: { html, title, url },
    });
  };

  await createBasicPage('about');
  await createBasicPage('contact');
  await createBasicPage('organizing');
};
