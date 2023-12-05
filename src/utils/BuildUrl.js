export const buildUrl = (slug, page) => {
  let url = '/';

  if (page) {
    if (page.treeParent) {
      if (page.treeParent.treeParent && page.treeParent.treeParent.treeParent) {
        url += `${page.treeParent.treeParent.treeParent.slug}/`;
      }

      if (page.treeParent.treeParent) {
        url += `${page.treeParent.treeParent.slug}/`;
      }

      url += `${page.treeParent.slug}/`;
    }
  }

  url += `${slug !== '/' ? `${slug.replace(/^\/|\/$/g, '')}/` : ''}`;

  return url;
};
