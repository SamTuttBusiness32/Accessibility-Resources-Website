import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../components/Layout';
import Banner from '../components/Banner';
import UserProfile from '../components/UserProfile';

const ProfilePage = () => {
  const {
    datoCmsProfile: { seoMetaTags, icon, bannerText, bannerImage },
  } = useStaticQuery(graphql`
    query ProfilePageQuery {
      datoCmsProfile {
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
    }
  `);

  return (
    <Layout seo={seoMetaTags}>
      <main>
        <Banner
          heading="Profile"
          icon={icon}
          text={bannerText}
          image={bannerImage}
        />
        <UserProfile />
      </main>
    </Layout>
  );
};

export default ProfilePage;
