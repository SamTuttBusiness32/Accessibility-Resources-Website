import React, { useEffect, useState } from 'react';
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
import { ThemeProvider } from 'styled-components';
import { standardTransition } from '../styles';

const GlobalFontSize = createGlobalStyle`
  html {
    font-size: 62.5%;
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
    
    letter-spacing: ${props => {
      switch (props.$textSpacingValue) {
        case 2:
          return '0.1em';
        case 3:
          return '0.2em';
        case 4:
          return '0.3em';
        default:
          return '0';
      }
    }};
    
    word-spacing: ${props => {
      switch (props.$textSpacingValue) {
        case 2:
          return '0.05em';
        case 3:
          return '0.1em';
        case 4:
          return '0.2em';
        default:
          return '0';
      }
    }};
    
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

  img{
    opacity: ${props => {
      switch (props.$hideImagesValue) {
        case 2:
          return '0 !important';
        default:
          return '1';
      }
    }};
    transition: ${standardTransition('opacity')};
  }

  ${props => {
    if (props.$highlightLinksValue === 2) {
      return `
      a, button, svg {
        color: yellow !important;
        background-color: blue !important;
        font-weight: bold !important;
        fill: yellow !important;
        border-color: yellow !important;
        transition:${standardTransition('color')},${standardTransition(
          'background-color',
        )},${standardTransition('fill')},${standardTransition(
          'border-color',
        )} !important;

        &:after{
          color: yellow !important;
        }
      }
    `;
    } else {
      return ''; // Empty string if $highlightLinksValue is not 2
    }
  }}
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
  // Function to get stored value from localStorage or use default
  const getStoredValue = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  };

  // Set initial state values using stored values or defaults
  const [overlayActive, setOverlayActive] = useState(false);
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(
    getStoredValue('fontSizeMultiplier', 1),
  );
  const [saturationValue, setSaturationValue] = useState(
    getStoredValue('saturationValue', 1),
  );
  const [textSpacingValue, setTextSpacingValue] = useState(
    getStoredValue('textSpacingValue', 1),
  );
  const [alignTextValue, setAlignTextValue] = useState(
    getStoredValue('alignTextValue', 1),
  );
  const [colourValue, setColourValue] = useState(
    getStoredValue('colourValue', 1),
  );
  const [lineHeightValue, setLineHeightValue] = useState(
    getStoredValue('lineHeightValue', 1),
  );
  const [hideImagesValue, setHideImagesValue] = useState(
    getStoredValue('hideImagesValue', 1),
  );
  const [highlightLinksValue, setHighlightLinksValue] = useState(
    getStoredValue('highlightLinksValue', 1),
  );
  const [fontWeightValue, setFontWeightValue] = useState(
    getStoredValue('fontWeightValue', 1),
  );

  // UseEffect to update localStorage when state changes
  useEffect(() => {
    localStorage.setItem(
      'fontSizeMultiplier',
      JSON.stringify(fontSizeMultiplier),
    );
    localStorage.setItem('saturationValue', JSON.stringify(saturationValue));
    localStorage.setItem('textSpacingValue', JSON.stringify(textSpacingValue));
    localStorage.setItem('alignTextValue', JSON.stringify(alignTextValue));
    localStorage.setItem('colourValue', JSON.stringify(colourValue));
    localStorage.setItem('lineHeightValue', JSON.stringify(lineHeightValue));
    localStorage.setItem('hideImagesValue', JSON.stringify(hideImagesValue));
    localStorage.setItem(
      'highlightLinksValue',
      JSON.stringify(highlightLinksValue),
    );
    localStorage.setItem('fontWeightValue', JSON.stringify(fontWeightValue));
  }, [
    fontSizeMultiplier,
    saturationValue,
    textSpacingValue,
    alignTextValue,
    colourValue,
    lineHeightValue,
    hideImagesValue,
    highlightLinksValue,
    fontWeightValue,
  ]);

  return (
    <ThemeProvider
      theme={{
        fontSizeMultiplier,
        alignTextValue,
        lineHeightValue,
        fontWeightValue,
      }}
    >
      <HelmetDatoCms seo={seo} favicon={faviconMetaTags}>
        <html lang="en-GB" />
        {noIndex && <meta name="robots" content="noindex, follow" />}
      </HelmetDatoCms>
      <GlobalFontSize
        $fontSizeMultiplier={fontSizeMultiplier}
        $saturationValue={saturationValue}
        $colourValue={colourValue}
        $textSpacingValue={textSpacingValue}
        $hideImagesValue={hideImagesValue}
        $highlightLinksValue={highlightLinksValue}
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
        textSpacingValue={textSpacingValue}
        setTextSpacingValue={setTextSpacingValue}
        lineHeightValue={lineHeightValue}
        setLineHeightValue={setLineHeightValue}
        hideImagesValue={hideImagesValue}
        setHideImagesValue={setHideImagesValue}
        highlightLinksValue={highlightLinksValue}
        setHighlightLinksValue={setHighlightLinksValue}
        fontWeightValue={fontWeightValue}
        setFontWeightValue={setFontWeightValue}
      />
    </ThemeProvider>
  );
};

export default Layout;
