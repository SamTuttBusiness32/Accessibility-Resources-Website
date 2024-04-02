require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    siteUrl: process.env.SITE_URL,
  },
  plugins: [
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: process.env.DATO_API_TOKEN,
        previewMode: process.env.DATO_PREVIEW_MODE,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: process.env.SITE_URL,
        stripQueryString: true,
      },
    },
    {
      resolve: `gatsby-source-cloudinary`,
      options: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        resourceType: `image`,
        type: `upload`,
        tags: true,
      },
    },
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: `Montserrat`,
              variants: [`400`, `700`],
            },
            {
              family: `Atkinson Hyperlegible`,
              variants: [`400`, `700`],
            },
            {
              family: `Noto Sans`,
              variants: [`400`, `700`],
            },
            {
              family: `Lexend`,
              variants: [`400`, `700`],
            },
          ],
        },
        formats: ['woff2'],
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-netlify`,
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: '/',
        query: `
          {
            allSitePage {
              nodes {
                path
                pageContext
              }
            }
          }
        `,
        resolveSiteUrl: () => process.env.SITE_URL,
        resolvePages: ({ allSitePage: { nodes } }) => {
          return nodes.filter(
            ({ pageContext }) => pageContext.noIndex !== true,
          );
        },
      },
    },
  ],
};
