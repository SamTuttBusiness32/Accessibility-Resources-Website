import React, { useEffect, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { ThemeProvider } from 'styled-components';
import { brandFonts, standardTransition } from '../styles';
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
    font-size: 62.5%;
    font-family: ${props => {
      switch (props.$fontValue) {
        case 2:
          return brandFonts.secondary;
        case 3:
          return brandFonts.tertiary;
        case 4:
          return brandFonts.quaternary;
        default:
          return brandFonts.primary;
      }
    }};

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
          return '0.4em';
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
  
  img{
    opacity: ${props => {
      switch (props.$hideImagesValue) {
        case 2:
          return '0 !important';
        default:
          return '1';
      }
    }};
    transition: ${({ theme }) =>
      standardTransition('opacity', theme.animationDelayValue)};
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
        transition: ${({ theme }) =>
          `${standardTransition('color', theme.animationDelayValue)},
          ${standardTransition('background-color', theme.animationDelayValue)},
          ${standardTransition('fill', theme.animationDelayValue)},
          ${standardTransition(
            'border-color',
            theme.animationDelayValue,
          )}`} !important;

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

  const [userSettings, setUserSettings] = useState();

  useEffect(() => {
    const userSettings = JSON.parse(localStorage.getItem('userSettings'))
      ? JSON.parse(localStorage.getItem('userSettings'))
      : '';
    setUserSettings(userSettings);
  }, []);

  // Set initial state values using stored values or defaults or userSettings
  const [overlayActive, setOverlayActive] = useState(false);
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(
    userSettings
      ? userSettings.fontSizeMultiplier
      : getStoredValue('fontSizeMultiplier', 1),
  );
  const [saturationValue, setSaturationValue] = useState(
    userSettings
      ? userSettings.saturationValue
      : getStoredValue('saturationValue', 1),
  );
  const [textSpacingValue, setTextSpacingValue] = useState(
    userSettings
      ? userSettings.textSpacingValue
      : getStoredValue('textSpacingValue', 1),
  );
  const [alignTextValue, setAlignTextValue] = useState(
    userSettings
      ? userSettings.alignTextValue
      : getStoredValue('alignTextValue', 1),
  );
  const [colourValue, setColourValue] = useState(
    userSettings ? userSettings.colourValue : getStoredValue('colourValue', 1),
  );
  const [lineHeightValue, setLineHeightValue] = useState(
    userSettings
      ? userSettings.lineHeightValue
      : getStoredValue('lineHeightValue', 1),
  );
  const [hideImagesValue, setHideImagesValue] = useState(
    userSettings
      ? userSettings.hideImagesValue
      : getStoredValue('hideImagesValue', 1),
  );
  const [highlightLinksValue, setHighlightLinksValue] = useState(
    userSettings
      ? userSettings.highlightLinksValue
      : getStoredValue('highlightLinksValue', 1),
  );
  const [fontWeightValue, setFontWeightValue] = useState(
    userSettings
      ? userSettings.fontWeightValue
      : getStoredValue('fontWeightValue', 1),
  );
  const [animationDelayValue, setAnimationDelayValue] = useState(
    userSettings
      ? userSettings.animationDelayValue
      : getStoredValue('animationDelayValue', 1),
  );
  const [fontValue, setFontValue] = useState(
    userSettings ? userSettings.fontValue : getStoredValue('fontValue', 1),
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
    localStorage.setItem(
      'animationDelayValue',
      JSON.stringify(animationDelayValue),
    );
    localStorage.setItem('fontValue', JSON.stringify(fontValue));
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
    animationDelayValue,
    fontValue,
  ]);

  return (
    <ThemeProvider
      theme={{
        fontSizeMultiplier,
        alignTextValue,
        lineHeightValue,
        fontWeightValue,
        animationDelayValue,
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
        $fontValue={fontValue}
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
        fontValue={fontValue}
        setFontValue={setFontValue}
        animationDelayValue={animationDelayValue}
        setAnimationDelayValue={setAnimationDelayValue}
      />
    </ThemeProvider>
  );
};

export default Layout;
