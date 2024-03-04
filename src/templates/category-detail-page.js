import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Banner from '../components/Banner';
import ModularBlocks from '../components/ModularBlocks';

const CategoryDetailPageTemplate = ({
  data: {
    datoCmsCategory: {
      seoMetaTags,
      noIndex,
      title,
      bannerHeading,
      bannerText,
      bannerImage,
      modularBlocks,
      guides,
    },
  },
}) => (
  <Layout seo={seoMetaTags} noIndex={noIndex}>
    <main>
      <Banner
        heading={bannerHeading ? bannerHeading : title}
        text={bannerText}
        image={bannerImage}
      />
      <ModularBlocks items={modularBlocks} />
      <ModularBlocks items={guides[0].modularBlocks} />
    </main>
  </Layout>
);

export const CategoryDetailPageTemplateQuery = graphql`
  query CategoryDetailPageTemplateQuery($id: String!) {
    datoCmsCategory(id: { eq: $id }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      noIndex
      title
      bannerHeading
      bannerText {
        value
        links {
          id: originalId
          text
          pageUrl {
            ...LinkFragment
          }
        }
      }
      bannerImage {
        url
        alt
      }
      modularBlocks {
        ...ContentModularBlockFragment
        ...CtasModularBlockFragment
      }
      guides {
        title
        modularBlocks {
          ...ContentModularBlockFragment
          ...CtasModularBlockFragment
          ...ImageContentModularBlockV2Fragment
        }
      }
    }
  }
`;

export default CategoryDetailPageTemplate;
