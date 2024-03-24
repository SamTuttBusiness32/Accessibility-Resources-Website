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

const GlobalFontSize = createGlobalStyle`
  html {
    font-size: ${props => 62.5 * props.$fontSizeMultiplier}%; 
    filter: ${props => {
      switch (props.$colourValue) {
        case 2:
          return 'grayscale(100%) sepia(100%) hue-rotate(10deg) brightness(1.1) contrast(0.9)';
        case 3:
          return 'grayscale(100%) sepia(100%) hue-rotate(75deg) brightness(1.1) contrast(0.9)';
        case 4:
          return 'grayscale(100%) sepia(100%) hue-rotate(-50deg) brightness(1.1) contrast(0.9)';
        case 5:
          return 'grayscale(100%)';
        default:
          return '';
      }
    }} ${props => `saturate(${props.$saturationValue})`};

    .textAlign{
      text-align: ${props => {
        switch (props.$alignTextValue) {
          case 2:
            return 'left !important';
          case 3:
            return 'center !important';
          case 4:
            return 'right !important';
          case 5:
            return 'justify !important';
          default:
            return 'inherit';
        }
      }};
    }

    .textAlignRight{
      text-align: ${props => {
        switch (props.$alignTextValue) {
          case 2:
            return 'left !important';
          case 3:
            return 'center !important';
          case 4:
            return 'right !important';
          case 5:
            return 'justify !important';
          default:
            return 'right';
        }
      }};
    }
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
  const [colourValue, setColourValue] = useState(1);
  const [alignTextValue, setAlignTextValue] = useState(1);

  console.log(alignTextValue);

  return (
    <>
      <HelmetDatoCms seo={seo} favicon={faviconMetaTags}>
        <html lang="en-GB" />
        {noIndex && <meta name="robots" content="noindex, follow" />}
      </HelmetDatoCms>
      <GlobalFontSize
        $fontSizeMultiplier={fontSizeMultiplier}
        $saturationValue={saturationValue}
        $colourValue={colourValue}
        $alignTextValue={alignTextValue}
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
        colourValue={colourValue}
        setColourValue={setColourValue}
        alignTextValue={alignTextValue}
        setAlignTextValue={setAlignTextValue}
      />
    </>
  );
};

export default Layout;
