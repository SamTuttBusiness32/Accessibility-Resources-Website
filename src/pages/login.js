import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../components/Layout';
import Banner from '../components/Banner';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const {
    datoCmsLogin: { seoMetaTags, bannerText, bannerImage },
  } = useStaticQuery(graphql`
    query LoginPageQuery {
      datoCmsLogin {
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
        <Banner heading="Login" text={bannerText} image={bannerImage} />
        <LoginForm isLogin={true} />
      </main>
    </Layout>
  );
};

export default LoginPage;
