const path = require(`path`);
const fs = require(`fs`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;
  const DefaultPageTemplate = path.resolve(`src/templates/default-page.js`);

  return graphql(`
    {
      allDatoCmsPage(filter: { root: { eq: true } }) {
        edges {
          node {
            id
            slug
            noIndex
            treeChildren {
              id
              slug
              noIndex
              treeChildren {
                id
                slug
                noIndex
                treeChildren {
                  id
                  slug
                  noIndex
                }
              }
            }
          }
        }
      }
      datoCmsSeo {
        redirects {
          fromPath
          toPath
          statusCode
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    const { allDatoCmsPage, datoCmsSeo } = result.data;

    if (allDatoCmsPage) {
      allDatoCmsPage.edges.forEach(
        ({ node: { slug: firstLevelSlug, id, noIndex, treeChildren } }) => {
          createPage({
            path: `/${firstLevelSlug}/`,
            component: DefaultPageTemplate,
            context: {
              id: id,
              noIndex: noIndex,
            },
          });
          treeChildren.forEach(
            ({ slug: secondLevelSlug, id, noIndex, treeChildren }) => {
              createPage({
                path: `/${firstLevelSlug}/${secondLevelSlug}/`,
                component: DefaultPageTemplate,
                context: {
                  id: id,
                  noIndex: noIndex,
                },
              });
              treeChildren.forEach(
                ({ slug: thirdLevelSlug, id, noIndex, treeChildren }) => {
                  createPage({
                    path: `/${firstLevelSlug}/${secondLevelSlug}/${thirdLevelSlug}/`,
                    component: DefaultPageTemplate,
                    context: {
                      id: id,
                      noIndex: noIndex,
                    },
                  });
                  treeChildren.forEach(
                    ({ slug: fourthLevelSlug, id, noIndex }) => {
                      createPage({
                        path: `/${firstLevelSlug}/${secondLevelSlug}/${thirdLevelSlug}/${fourthLevelSlug}/`,
                        component: DefaultPageTemplate,
                        context: {
                          id: id,
                          noIndex: noIndex,
                        },
                      });
                    },
                  );
                },
              );
            },
          );
        },
      );
    }

    if (datoCmsSeo) {
      datoCmsSeo.redirects.forEach(({ fromPath, toPath, statusCode }) => {
        createRedirect({
          fromPath: fromPath,
          toPath: toPath,
          statusCode: statusCode,
        });
      });
    }
  });
};

exports.onPostBuild = () => {
  if (fs.existsSync('./public/sitemap-index.xml')) {
    fs.renameSync('./public/sitemap-index.xml', './public/sitemap.xml');
  }
};
