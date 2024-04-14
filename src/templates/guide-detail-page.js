import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Banner from '../components/Banner';
import ModularBlocks from '../components/ModularBlocks';
import GuideListing from '../components/GuideListing';

const GuideDetailPageTemplate = ({
  data: {
    datoCmsGuide: { seoMetaTags, title, text, image, modularBlocks },
    allDatoCmsGuide: { guides },
  },
}) => (
  <Layout seo={seoMetaTags}>
    <main>
      <Banner heading={title} text={text} image={image} />
      <ModularBlocks items={modularBlocks} />
      <GuideListing items={guides} />
    </main>
  </Layout>
);

export const GuideDetailPageTemplateQuery = graphql`
  query GuideDetailPageTemplateQuery($id: String!) {
    datoCmsGuide(id: { eq: $id }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      text {
        value
        links {
          id: originalId
          text
          pageUrl {
            ...LinkFragment
          }
        }
      }
      image {
        gatsbyImageData(
          width: 1920
          height: 580
          layout: FULL_WIDTH
          imgixParams: { fit: "crop", w: "1920", h: "580" }
        )
        alt
      }
      modularBlocks {
        ...ContentModularBlockFragment
      }
    }
    allDatoCmsGuide(filter: { id: { ne: $id } }, limit: 2) {
      guides: nodes {
        ...GuideCardFragment
      }
    }
  }
`;

export default GuideDetailPageTemplate;
