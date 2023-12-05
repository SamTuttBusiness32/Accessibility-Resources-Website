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
          url
          alt
        }
        modularBlocks {
          ...ContentModularBlockFragment
        }
      }
    }
  `);

  return (
    <Layout seo={seoMetaTags}>
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
};

export default IndexPage;
