import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../components/Layout';
import HomePageBanner from '../components/HomePageBanner';
import ModularBlocks from '../components/ModularBlocks';

const IndexPage = () => {
  const {
    datoCmsHome: {
      seoMetaTags,
      title,
      bannerHeading,
      bannerText,
      bannerImage,
      modularBlocks,
    },
  } = useStaticQuery(graphql`
    query IndexPageQuery {
      datoCmsHome {
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
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
          ...ContentModularBlockFragment
          ...CtasModularBlockFragment
          ...ImageContentModularBlockV1Fragment
          ...ImageContentModularBlockV2Fragment
          ...StatisticsModularBlockFragment
        }
      }
    }
  `);

  return (
    <Layout seo={seoMetaTags}>
      <main>
        <HomePageBanner
          heading={bannerHeading ? bannerHeading : title}
          text={bannerText}
          image={bannerImage}
        />
        <ModularBlocks items={modularBlocks} />
      </main>
    </Layout>
  );
};

export default IndexPage;
