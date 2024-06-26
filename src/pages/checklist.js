import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../components/Layout';
import Banner from '../components/Banner';
import Checklist from '../components/Checklist';
import ModularBlocks from '../components/ModularBlocks';

const ChecklistPage = () => {
  const {
    datoCmsChecklistArchive: {
      seoMetaTags,
      title,
      icon,
      bannerHeading,
      bannerText,
      bannerImage,
      modularBlocks,
    },
    allDatoCmsChecklist: { nodes },
  } = useStaticQuery(graphql`
    query ChecklistPageQuery {
      datoCmsChecklistArchive {
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
          ...ImageContentCardsModularBlockFragment
        }
      }
      allDatoCmsChecklist(
        filter: { root: { eq: true } }
        sort: { position: ASC }
      ) {
        nodes {
          title
          content {
            value
          }
          treeChildren {
            title
            content {
              value
            }
            treeChildren {
              title
              level
              content {
                value
              }
            }
          }
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
        <Checklist checkboxOptions={nodes} />
      </main>
    </Layout>
  );
};

export default ChecklistPage;
