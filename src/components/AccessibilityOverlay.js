import React, { useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled, { css } from 'styled-components';
import {
  brandColours,
  brandFonts,
  fontSize,
  fontWeights,
  minBreakpointQuery,
  standardColours,
  standardTransition,
  zIndexLayers,
} from '../styles';
import { Button, CardFooter, CardHeader, HtmlContent } from './ui';

const StyledAccessibilityOverlay = styled.div`
  position: fixed;
  z-index: ${zIndexLayers.fifth};
  background-color: ${brandColours.primary};
  top: 0;
  left: -100%;
  height: 100vh;
  margin-top: 90px;
  padding-top: 124px;
  padding-bottom: 20px;
  max-width: 600px;
  width: 100%;
  transition: ${({ theme }) =>
    standardTransition('left', theme.animationDelayValue)};
  font-family: ${brandFonts.primary};

  ${minBreakpointQuery.mlarge`
    margin-top: 80px;
    padding-top: 114px;
  `}

  ${({ $overlayActive }) => {
    if ($overlayActive) {
      return css`
        left: 0;
      `;
    }
  }}

::-webkit-scrollbar {
    width: 10px;
    border-radius: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: ${standardColours.darkGrey};
    border-radius: 5px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${standardColours.lightGrey};
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${standardColours.lightGrey};
  }
`;

const StyledInner = styled.div`
  padding-left: 20px;
  padding-right: 10px;
  height: 100%;
  overflow-y: scroll;
  height: calc(100% - 90px);
  margin-right: 10px;

  ${minBreakpointQuery.mlarge`
    height: calc(100% - 80px);
  `}
`;

const StyledText = styled(HtmlContent)`
  color: ${standardColours.white};
  text-align: center;

  p {
    line-height: 1.2;
    letter-spacing: 0;
    word-spacing: 0;
    font-weight: ${fontWeights.regular};
    ${fontSize(16)}
  }
`;

const StyledButtonWrapper = styled.div`
  background-color: ${brandColours.primary};
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  background-color: ${standardColours.white};
  color: ${brandColours.primary};
  border-radius: 0;
  line-height: 1.5;
  letter-spacing: 0;
  word-spacing: 0;
  font-weight: ${fontWeights.regular};
  text-align: center;
  ${fontSize(16)}

  &:hover {
    color: ${standardColours.white};
  }
`;

const StyledItems = styled.div`
  margin-top: 20px;
  display: grid;
  gap: 20px;

  ${minBreakpointQuery.small`
    grid-template-columns: repeat(2, 1fr);
  `};
`;

const StyledItem = styled.div`
  background-color: ${standardColours.white};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

const StyledItemInner = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  line-height: 1.2;
  letter-spacing: 0;
  word-spacing: 0;
  font-weight: ${fontWeights.regular};
`;

const StyledTextSizeContent = styled.div`
  margin-top: auto;
`;

const StyledTextSizeText = styled.p`
  margin-top: 10px;
  text-align: center;
  ${fontSize(16)};
  line-height: 1.2;
`;

const AccessibilityOverlay = ({
  overlayActive,
  fontSizeMultiplier,
  setFontSizeMultiplier,
  saturationValue,
  setSaturationValue,
  colourValue,
  setColourValue,
  alignTextValue,
  setAlignTextValue,
  textSpacingValue,
  setTextSpacingValue,
  lineHeightValue,
  setLineHeightValue,
  hideImagesValue,
  setHideImagesValue,
  highlightLinksValue,
  setHighlightLinksValue,
  fontWeightValue,
  setFontWeightValue,
  animationDelayValue,
  setAnimationDelayValue,
  fontValue,
  setFontValue,
}) => {
  const {
    datoCmsAccessibilityOverlay: { text },
    allDatoCmsAccessibilityFunction: { nodes },
  } = useStaticQuery(graphql`
    query AccessibilityOverlayQuery {
      datoCmsAccessibilityOverlay {
        heading
        text {
          value
        }
      }
      allDatoCmsAccessibilityFunction(sort: { position: ASC }) {
        nodes {
          title
          text
          icon {
            url
            alt
          }
        }
      }
    }
  `);

  const fontSizeOptions = [1, 1.1, 1.2]; // Define your font size options
  const saturationOptions = [1, 0.5, 3, 0]; // Define your saturation options
  const alignTextOptions = [1, 2, 3, 4, 5]; // Define your saturation options
  const lineHeightOptions = [1, 2, 3, 4]; // Define your saturation options
  const textSpacingOptions = [1, 2, 3, 4]; // Define your saturation options
  const hideImagesOptions = [1, 2]; // Define your saturation options
  const highlightLinksOptions = [1, 2]; // Define your saturation options
  const colourOptions = [1, 2, 3, 4, 5]; // Define your saturation options
  const fontWeightOptions = [1, 2, 3]; // Define your saturation options
  const animationDelayOptions = [1, 2, 3];
  const fontOptions = [1, 2, 3, 4]; // Define your saturation options

  const handleFontSizeClick = option => {
    setFontSizeMultiplier(option);
  };

  const handleSaturationClick = option => {
    setSaturationValue(option);
  };

  const handleLineHeightClick = option => {
    setLineHeightValue(option);
  };

  const handleTextSpacingClick = option => {
    setTextSpacingValue(option);
  };

  const handleAlignTextClick = option => {
    setAlignTextValue(option);
  };

  const handleHideImagesClick = option => {
    setHideImagesValue(option);
  };

  const handleHighlightLinksClick = option => {
    setHighlightLinksValue(option);
  };

  const handleColourClick = option => {
    setColourValue(option);
  };

  const handleFontWeightClick = option => {
    setFontWeightValue(option);
  };

  const handleAnimationDelayClick = option => {
    setAnimationDelayValue(option);
  };

  const handleFontClick = option => {
    setFontValue(option);
  };

  // Function to handle saving values to local storage when the "Save" button is clicked
  const handleSaveClick = () => {};

  const handleResetClick = () => {
    // Reset all values to 1
    setFontSizeMultiplier(1);
    setSaturationValue(1);
    setColourValue(1);
    setAlignTextValue(1);
    setTextSpacingValue(1);
    setLineHeightValue(1);
    setHideImagesValue(1);
    setHighlightLinksValue(1);
    setFontWeightValue(1);
    setAnimationDelayValue(1);
    setFontValue(1);
  };

  return (
    <StyledAccessibilityOverlay $overlayActive={overlayActive}>
      <StyledInner $overlayActive={overlayActive}>
        <StyledText content={text} />
        <StyledButtonWrapper>
          <StyledButton onClick={handleResetClick}>Reset</StyledButton>
          <StyledButton onClick={handleSaveClick}>Save</StyledButton>
        </StyledButtonWrapper>
        <StyledItems>
          {nodes.map((item, id) => (
            <StyledItem key={id}>
              {nodes[id].title === 'Text Size' ? (
                <StyledItemInner
                  onClick={() => {
                    const currentIndex =
                      fontSizeOptions.indexOf(fontSizeMultiplier);
                    const nextIndex =
                      (currentIndex + 1) % fontSizeOptions.length;
                    const nextOption = fontSizeOptions[nextIndex];
                    handleFontSizeClick(nextOption);
                  }}
                >
                  <CardHeader {...item} />
                  <StyledTextSizeContent>
                    <StyledTextSizeText>
                      {fontSizeMultiplier === 1
                        ? 'Standard Text'
                        : fontSizeMultiplier === 1.1
                        ? 'Larger Text'
                        : 'Largest Text'}
                    </StyledTextSizeText>
                  </StyledTextSizeContent>
                  <CardFooter
                    options={fontSizeOptions}
                    value={fontSizeMultiplier}
                  />
                </StyledItemInner>
              ) : nodes[id].title === 'Saturation' ? (
                <StyledItemInner
                  onClick={() => {
                    const currentIndex =
                      saturationOptions.indexOf(saturationValue);
                    const nextIndex =
                      (currentIndex + 1) % saturationOptions.length;
                    const nextOption = saturationOptions[nextIndex];
                    handleSaturationClick(nextOption);
                  }}
                >
                  <CardHeader {...item} />
                  <StyledTextSizeContent>
                    <StyledTextSizeText>
                      {saturationValue === 0.5
                        ? 'Low Saturation'
                        : saturationValue === 3
                        ? 'High Saturation'
                        : saturationValue === 0
                        ? 'No Saturation'
                        : 'Standard Saturation'}
                    </StyledTextSizeText>
                  </StyledTextSizeContent>
                  <CardFooter
                    options={saturationOptions}
                    value={saturationValue}
                  />
                </StyledItemInner>
              ) : nodes[id].title === 'Text Spacing' ? (
                <StyledItemInner
                  onClick={() => {
                    const currentIndex =
                      textSpacingOptions.indexOf(textSpacingValue);
                    const nextIndex =
                      (currentIndex + 1) % textSpacingOptions.length;
                    const nextOption = textSpacingOptions[nextIndex];
                    handleTextSpacingClick(nextOption);
                  }}
                >
                  <CardHeader {...item} />
                  <StyledTextSizeContent>
                    <StyledTextSizeText>
                      {textSpacingValue === 2
                        ? 'Small Spacing'
                        : textSpacingValue === 3
                        ? 'Mid Spacing'
                        : textSpacingValue === 4
                        ? 'Large Spacing'
                        : 'Standard Spacing'}
                    </StyledTextSizeText>
                  </StyledTextSizeContent>
                  <CardFooter
                    options={textSpacingOptions}
                    value={textSpacingValue}
                  />
                </StyledItemInner>
              ) : nodes[id].title === 'Line Height' ? (
                <StyledItemInner
                  onClick={() => {
                    const currentIndex =
                      lineHeightOptions.indexOf(lineHeightValue);
                    const nextIndex =
                      (currentIndex + 1) % lineHeightOptions.length;
                    const nextOption = lineHeightOptions[nextIndex];
                    handleLineHeightClick(nextOption);
                  }}
                >
                  <CardHeader {...item} />
                  <StyledTextSizeContent>
                    <StyledTextSizeText>
                      {lineHeightValue === 2
                        ? 'Small Line Height'
                        : lineHeightValue === 3
                        ? 'Mid Line Height'
                        : lineHeightValue === 4
                        ? 'Large Line Height'
                        : 'Standard Line Height'}
                    </StyledTextSizeText>
                    <CardFooter
                      options={lineHeightOptions}
                      value={lineHeightValue}
                    />
                  </StyledTextSizeContent>
                </StyledItemInner>
              ) : nodes[id].title === 'Align Text' ? (
                <StyledItemInner
                  onClick={() => {
                    const currentIndex =
                      alignTextOptions.indexOf(alignTextValue);
                    const nextIndex =
                      (currentIndex + 1) % alignTextOptions.length;
                    const nextOption = alignTextOptions[nextIndex];
                    handleAlignTextClick(nextOption);
                  }}
                >
                  <CardHeader {...item} />
                  <StyledTextSizeContent>
                    <StyledTextSizeText>
                      {alignTextValue === 2
                        ? 'Left'
                        : alignTextValue === 3
                        ? 'Center'
                        : alignTextValue === 4
                        ? 'Right'
                        : alignTextValue === 5
                        ? 'Justify'
                        : 'Standard'}
                    </StyledTextSizeText>
                  </StyledTextSizeContent>
                  <CardFooter
                    options={alignTextOptions}
                    value={alignTextValue}
                  />
                </StyledItemInner>
              ) : nodes[id].title === 'Hide Images' ? (
                <StyledItemInner
                  onClick={() => {
                    const currentIndex =
                      hideImagesOptions.indexOf(hideImagesValue);
                    const nextIndex =
                      (currentIndex + 1) % hideImagesOptions.length;
                    const nextOption = hideImagesOptions[nextIndex];
                    handleHideImagesClick(nextOption);
                  }}
                >
                  <CardHeader {...item} />
                  <StyledTextSizeContent>
                    <StyledTextSizeText>
                      {hideImagesValue === 2 ? 'Images Hidden' : 'Images Shown'}
                    </StyledTextSizeText>
                  </StyledTextSizeContent>
                  <CardFooter
                    options={hideImagesOptions}
                    value={hideImagesValue}
                  />
                </StyledItemInner>
              ) : nodes[id].title === 'Highlight Links' ? (
                <StyledItemInner
                  onClick={() => {
                    const currentIndex =
                      highlightLinksOptions.indexOf(highlightLinksValue);
                    const nextIndex =
                      (currentIndex + 1) % highlightLinksOptions.length;
                    const nextOption = highlightLinksOptions[nextIndex];
                    handleHighlightLinksClick(nextOption);
                  }}
                >
                  <CardHeader {...item} />
                  <StyledTextSizeContent>
                    <StyledTextSizeText>
                      {highlightLinksValue === 2
                        ? 'Links Highlighted'
                        : 'Normal Links'}
                    </StyledTextSizeText>
                  </StyledTextSizeContent>
                  <CardFooter
                    options={highlightLinksOptions}
                    value={highlightLinksValue}
                  />
                </StyledItemInner>
              ) : nodes[id].title === 'Colour' ? (
                <StyledItemInner
                  onClick={() => {
                    const currentIndex = colourOptions.indexOf(colourValue);
                    const nextIndex = (currentIndex + 1) % colourOptions.length;
                    const nextOption = colourOptions[nextIndex];
                    handleColourClick(nextOption);
                  }}
                >
                  <CardHeader {...item} />
                  <StyledTextSizeContent>
                    <StyledTextSizeText>
                      {colourValue === 2
                        ? 'Protanopia / Protanomaly'
                        : colourValue === 3
                        ? 'Deuteranopia / Deuteranomaly'
                        : colourValue === 4
                        ? 'Tritanopia / Tritanomaly'
                        : colourValue === 5
                        ? 'Achromatopsia / Achromatomaly'
                        : 'Standard'}
                    </StyledTextSizeText>
                  </StyledTextSizeContent>
                  <CardFooter options={colourOptions} value={colourValue} />
                </StyledItemInner>
              ) : nodes[id].title === 'Font Weight' ? (
                <StyledItemInner
                  onClick={() => {
                    const currentIndex =
                      fontWeightOptions.indexOf(fontWeightValue);
                    const nextIndex =
                      (currentIndex + 1) % fontWeightOptions.length;
                    const nextOption = fontWeightOptions[nextIndex];
                    handleFontWeightClick(nextOption);
                  }}
                >
                  <CardHeader {...item} />
                  <StyledTextSizeContent>
                    <StyledTextSizeText>
                      {fontWeightValue === 2
                        ? 'Regular'
                        : fontWeightValue === 3
                        ? 'Bold'
                        : 'Standard'}
                    </StyledTextSizeText>
                  </StyledTextSizeContent>
                  <CardFooter
                    options={fontWeightOptions}
                    value={fontWeightValue}
                  />
                </StyledItemInner>
              ) : nodes[id].title === 'Toggle Animations' ? (
                <StyledItemInner
                  onClick={() => {
                    const currentIndex =
                      animationDelayOptions.indexOf(animationDelayValue);
                    const nextIndex =
                      (currentIndex + 1) % animationDelayOptions.length;
                    const nextOption = animationDelayOptions[nextIndex];
                    handleAnimationDelayClick(nextOption);
                  }}
                >
                  <CardHeader {...item} />
                  <StyledTextSizeContent>
                    <StyledTextSizeText>
                      {animationDelayValue === 2
                        ? 'Slow Delay'
                        : animationDelayValue === 3
                        ? 'No Delay'
                        : 'Standard Delay'}
                    </StyledTextSizeText>
                  </StyledTextSizeContent>
                  <CardFooter
                    options={animationDelayOptions}
                    value={animationDelayValue}
                  />
                </StyledItemInner>
              ) : nodes[id].title === 'Font' ? (
                <StyledItemInner
                  onClick={() => {
                    const currentIndex = fontOptions.indexOf(fontValue);
                    const nextIndex = (currentIndex + 1) % fontOptions.length;
                    const nextOption = fontOptions[nextIndex];
                    handleFontClick(nextOption);
                  }}
                >
                  <CardHeader {...item} />
                  <StyledTextSizeContent>
                    <StyledTextSizeText>
                      {fontValue === 2
                        ? 'Atkinson Hyperlegible'
                        : fontValue === 3
                        ? 'Noto Sans'
                        : fontValue === 4
                        ? 'Lexend'
                        : 'Montserrat'}
                    </StyledTextSizeText>
                  </StyledTextSizeContent>
                  <CardFooter options={fontOptions} value={fontValue} />
                </StyledItemInner>
              ) : (
                <StyledItemInner>
                  <CardHeader {...item} />
                </StyledItemInner>
              )}
            </StyledItem>
          ))}
        </StyledItems>
      </StyledInner>
    </StyledAccessibilityOverlay>
  );
};

export default AccessibilityOverlay;
