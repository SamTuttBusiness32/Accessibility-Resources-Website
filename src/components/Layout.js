import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import GlobalStyle from '../styles/GlobalStyle';
import Header from './Header';
import Footer from './Footer';
import CookieNotice from './CookieNotice';

const Layout = ({ seo, noIndex, children }) => {
  const {
    datoCmsSite: { faviconMetaTags },
  } = useStaticQuery(graphql`
    query LayoutQuery {
      datoCmsSite {
        faviconMetaTags {
          ...GatsbyDatoCmsFaviconMetaTags
        }
      }
    }
  `);

  return (
    <>
      <HelmetDatoCms seo={seo} favicon={faviconMetaTags}>
        <html lang="en-GB" />
        {noIndex && <meta name="robots" content="noindex, follow" />}
      </HelmetDatoCms>
      <GlobalStyle />
      <Header />
      {children}
      <Footer />
      <CookieNotice />
    </>
  );
};

export default Layout;
