import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Banner from '../components/Banner';
import ModularBlocks from '../components/ModularBlocks';

const DefaultPageTemplate = ({
  data: {
    datoCmsPage: {
      seoMetaTags,
      noIndex,
      title,
      bannerHeading,
      bannerText,
      bannerImage,
      modularBlocks,
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
    </main>
  </Layout>
);

export const DefaultPageTemplateQuery = graphql`
  query DefaultPageTemplateQuery($id: String!) {
    datoCmsPage(id: { eq: $id }) {
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
    }
  }
`;

export default DefaultPageTemplate;
