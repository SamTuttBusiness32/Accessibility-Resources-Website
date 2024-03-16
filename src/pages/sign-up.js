import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../components/Layout';
import Banner from '../components/Banner';
import LoginForm from '../components/LoginForm';

const SignUpPage = () => {
  const {
    datoCmsLogin: {
      seoMetaTags,
      title,
      bannerHeading,
      bannerText,
      bannerImage,
    },
  } = useStaticQuery(graphql`
    query SignUpPageQuery {
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
      }
    }
  `);

  return (
    <Layout seo={seoMetaTags}>
      <main>
        <Banner heading="Sign Up" text={bannerText} image={bannerImage} />
        <LoginForm />
      </main>
    </Layout>
  );
};

export default SignUpPage;
