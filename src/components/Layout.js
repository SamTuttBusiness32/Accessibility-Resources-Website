import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import { createGlobalStyle } from 'styled-components';
import GlobalStyle from '../styles/GlobalStyle';
import Header from './Header';
import Footer from './Footer';
import CookieNotice from './CookieNotice';
import AccessibilityCta from './AccessibilityCta';
import AccessibilityOverlay from './AccessibilityOverlay';
import cursorT from '../images/cursor-t.svg';
import { standardColours } from '../styles';

const GlobalFontSize = createGlobalStyle`
  html {
    font-size: ${props => 62.5 * props.$fontSizeMultiplier}%; 
    filter: ${props => `saturate(${props.$saturationValue})`};  

    /* Protanopia/Protanomaly Red color blindness*/
    //filter: grayscale(100%) sepia(100%) hue-rotate(10deg) brightness(1.1) contrast(0.9);

    /* Deuteranopia/Deuteranomaly Green color blindness*/
    //filter: grayscale(100%) sepia(100%) hue-rotate(75deg) brightness(1.1) contrast(0.9);

    /* Tritanopia/Tritanomaly Blue color blindness*/
    //filter: grayscale(100%) sepia(100%) hue-rotate(-50deg) brightness(1.1) contrast(0.9);

    /* Achromatopsia/Achromatomaly Total color blindness or lack of color perception*/
    //filter: grayscale(100%);
    
  }
  /* body{
    cursor: url(${cursorT}), auto !important;
  }
  button{
    cursor: url(${cursorT}), auto !important;
  }
  a{
    cursor: url(${cursorT}), auto !important;
  }
  input{
    cursor: url(${cursorT}), auto !important;
  } */



 
`;

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
  const [overlayActive, setOverlayActive] = useState(false);
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [saturationValue, setSaturationValue] = useState(1);

  return (
    <>
      <HelmetDatoCms seo={seo} favicon={faviconMetaTags}>
        <html lang="en-GB" />
        {noIndex && <meta name="robots" content="noindex, follow" />}
      </HelmetDatoCms>
      <GlobalFontSize
        $fontSizeMultiplier={fontSizeMultiplier}
        $saturationValue={saturationValue}
      />
      <GlobalStyle />
      <Header />
      {children}
      <Footer />
      <CookieNotice />
      <AccessibilityCta
        overlayActive={overlayActive}
        setOverlayActive={setOverlayActive}
      />
      <AccessibilityOverlay
        overlayActive={overlayActive}
        setOverlayActive={setOverlayActive}
        fontSizeMultiplier={fontSizeMultiplier}
        setFontSizeMultiplier={setFontSizeMultiplier}
        saturationValue={saturationValue}
        setSaturationValue={setSaturationValue}
      />
    </>
  );
};

export default Layout;
