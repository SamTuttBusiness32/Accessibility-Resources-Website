import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../components/Layout';
import Banner from '../components/Banner';
import ModularBlocks from '../components/ModularBlocks';

const IndexPage = () => {
  const {
    datoCmsHome: {
      seoMetaTags,
      title,
      icon,
      bannerHeading,
      bannerText,
      bannerImage,
      modularBlocks,
    },
    allCloudinaryMedia,
  } = useStaticQuery(graphql`
    query IndexPageQuery {
      datoCmsHome {
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
        modularBlocks {
          ...ContentModularBlockFragment
          ...CtasModularBlockFragment
          ...ImageContentModularBlockV1Fragment
          ...ImageContentModularBlockV2Fragment
          ...StatisticsModularBlockFragment
        }
      }
      allCloudinaryMedia(filter: { folder: { eq: "Profile Pictures" } }) {
        nodes {
          url
          folder
        }
      }
    }
  `);

  return (
    <Layout seo={seoMetaTags}>
      <main>
        <Banner
          heading={bannerHeading ? bannerHeading : title}
          icon={icon}
          text={bannerText}
          image={bannerImage}
        />
        <ModularBlocks items={modularBlocks} />
      </main>
    </Layout>
  );
};

export default IndexPage;
