import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Banner from '../components/Banner';
import ModularBlocks from '../components/ModularBlocks';
import GuideListing from '../components/GuideListing';

const GuideListingPageTemplate = ({
  data: {
    datoCmsGuideArchive: {
      seoMetaTags,
      title,
      icon,
      bannerHeading,
      bannerText,
      bannerImage,
    },
    allDatoCmsGuide: { guides },
  },
}) => (
  <Layout seo={seoMetaTags}>
    <main>
      <Banner
        heading={bannerHeading ? bannerHeading : title}
        icon={icon}
        text={bannerText}
        image={bannerImage}
      />
      <GuideListing items={guides} />
    </main>
  </Layout>
);

export const GuideListingPageTemplateQuery = graphql`
  query GuideListingPageTemplateQuery {
    datoCmsGuideArchive {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      icon {
        url
        alt
      }
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
    }
    allDatoCmsGuide {
      guides: nodes {
        ...GuideCardFragment
      }
    }
  }
`;

export default GuideListingPageTemplate;
