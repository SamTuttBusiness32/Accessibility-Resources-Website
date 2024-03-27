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
        gatsbyImageData(
          width: 1920
          height: 580
          layout: FULL_WIDTH
          imgixParams: { fit: "crop", w: "1920", h: "580" }
        )
        alt
      }
      modularBlocks {
        ...AccessibilityFunctionsGuideModularBlockFragment
        ...ContentModularBlockFragment
        ...CtasModularBlockFragment
        ...StatisticsModularBlockFragment
      }
    }
  }
`;

export default DefaultPageTemplate;
