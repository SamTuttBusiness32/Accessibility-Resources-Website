import React from 'react';
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
  background-color: ${standardColours.transparentBlack(0.8)};
  z-index: ${zIndexLayers.fourth};
  top: 0;
  left: -100%;
  height: 100vh;
  margin-top: 90px;
  width: 100%;
  transition: ${({ theme }) =>
    standardTransition('left', theme.animationDelayValue)};
  font-family: ${brandFonts.primary};
  cursor: pointer;

  ${minBreakpointQuery.mlarge`
    margin-top: 80px;
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
    background: #003131;
    border-radius: 5px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${brandColours.primary};
    border-radius: 5px;
  }

  /* Handle on hover 
  ::-webkit-scrollbar-thumb:hover {
    background: ${standardColours.lightGrey};
  }
  */
`;

const StyledOuter = styled.div`
  max-width: 600px;
  background-color: #eaf6ff;
  padding: 20px;
  padding-top: 116px;
  height: calc(100% - 92px);
  cursor: default;

  ${minBreakpointQuery.mlarge`
    height: calc(100% - 82px);
  `}
`;

const StyledInner = styled.div`
  height: 100%;
  overflow-y: auto;
  padding-right: 20px;
  flex: 1;
`;

const StyledText = styled(HtmlContent)`
  color: ${brandColours.primary};
  text-align: center;
  margin-bottom: 20px;

  p {
    line-height: 1.2;
    letter-spacing: 0;
    word-spacing: 0;
    font-weight: ${fontWeights.regular};
    ${fontSize(16)}
  }
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
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
  border: solid 2px ${brandColours.tertiary};
  border-radius: 4px;

  &:hover {
    color: ${standardColours.white};
    background-color: ${brandColours.primary};
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

//moved up for hover
const StyledCardHeader = styled(CardHeader)`
  transition: ${({ theme }) =>
    `${standardTransition('border-color', theme.animationDelayValue)}`};

  img {
    transition: ${({ theme }) =>
      `${standardTransition('filter', theme.animationDelayValue)}`};
  }
`;

//moved up for hover
const StyledCardFooter = styled(CardFooter)``;

const StyledItem = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
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
  border-radius: 5px;
  border: solid 2px #003131;
  color: ${brandColours.primary};
  background-color: ${standardColours.white};
  transition: ${({ theme }) =>
    `${standardTransition('color', theme.animationDelayValue)},
    ${standardTransition('background-color', theme.animationDelayValue)}`};

  &:hover {
    color: ${standardColours.white};
    background-color: ${brandColours.primary};

    ${StyledCardHeader} {
      border-color: ${standardColours.white};
      img {
        filter: brightness(0) invert(1);
      }
    }

    ${StyledCardFooter} {
    }
  }

  ${({ $active }) => {
    if ($active) {
      return css`
        color: ${standardColours.white};
        background-color: ${brandColours.primary};

        ${StyledCardHeader} {
          border-color: ${standardColours.white};
          img {
            filter: brightness(0) invert(1);
          }
        }
      `;
    }
  }}
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
  setOverlayActive,
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
  ...props
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
    <StyledAccessibilityOverlay
      $overlayActive={overlayActive}
      {...props}
      onClick={() => {
        setOverlayActive(false);
      }}
    >
      <StyledOuter
        onClick={e => {
          // Stop event propagation to prevent bubbling up to StyledAccessibilityOverlay
          e.stopPropagation();
        }}
      >
        <StyledInner>
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
                    $active={fontSizeMultiplier > 1}
                    onClick={() => {
                      const currentIndex =
                        fontSizeOptions.indexOf(fontSizeMultiplier);
                      const nextIndex =
                        (currentIndex + 1) % fontSizeOptions.length;
                      const nextOption = fontSizeOptions[nextIndex];
                      handleFontSizeClick(nextOption);
                    }}
                  >
                    <StyledCardHeader {...item} />
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
                    $active={saturationValue !== 1}
                    onClick={() => {
                      const currentIndex =
                        saturationOptions.indexOf(saturationValue);
                      const nextIndex =
                        (currentIndex + 1) % saturationOptions.length;
                      const nextOption = saturationOptions[nextIndex];
                      handleSaturationClick(nextOption);
                    }}
                  >
                    <StyledCardHeader {...item} />
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
                    $active={textSpacingValue > 1}
                    onClick={() => {
                      const currentIndex =
                        textSpacingOptions.indexOf(textSpacingValue);
                      const nextIndex =
                        (currentIndex + 1) % textSpacingOptions.length;
                      const nextOption = textSpacingOptions[nextIndex];
                      handleTextSpacingClick(nextOption);
                    }}
                  >
                    <StyledCardHeader {...item} />
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
                    $active={lineHeightValue > 1}
                    onClick={() => {
                      const currentIndex =
                        lineHeightOptions.indexOf(lineHeightValue);
                      const nextIndex =
                        (currentIndex + 1) % lineHeightOptions.length;
                      const nextOption = lineHeightOptions[nextIndex];
                      handleLineHeightClick(nextOption);
                    }}
                  >
                    <StyledCardHeader {...item} />
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
                    $active={alignTextValue > 1}
                    onClick={() => {
                      const currentIndex =
                        alignTextOptions.indexOf(alignTextValue);
                      const nextIndex =
                        (currentIndex + 1) % alignTextOptions.length;
                      const nextOption = alignTextOptions[nextIndex];
                      handleAlignTextClick(nextOption);
                    }}
                  >
                    <StyledCardHeader {...item} />
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
                    $active={hideImagesValue > 1}
                    onClick={() => {
                      const currentIndex =
                        hideImagesOptions.indexOf(hideImagesValue);
                      const nextIndex =
                        (currentIndex + 1) % hideImagesOptions.length;
                      const nextOption = hideImagesOptions[nextIndex];
                      handleHideImagesClick(nextOption);
                    }}
                  >
                    <StyledCardHeader {...item} />
                    <StyledTextSizeContent>
                      <StyledTextSizeText>
                        {hideImagesValue === 2
                          ? 'Images Hidden'
                          : 'Images Shown'}
                      </StyledTextSizeText>
                    </StyledTextSizeContent>
                    <CardFooter
                      options={hideImagesOptions}
                      value={hideImagesValue}
                    />
                  </StyledItemInner>
                ) : nodes[id].title === 'Highlight Links' ? (
                  <StyledItemInner
                    $active={highlightLinksValue > 1}
                    onClick={() => {
                      const currentIndex =
                        highlightLinksOptions.indexOf(highlightLinksValue);
                      const nextIndex =
                        (currentIndex + 1) % highlightLinksOptions.length;
                      const nextOption = highlightLinksOptions[nextIndex];
                      handleHighlightLinksClick(nextOption);
                    }}
                  >
                    <StyledCardHeader {...item} />
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
                    $active={colourValue > 1}
                    onClick={() => {
                      const currentIndex = colourOptions.indexOf(colourValue);
                      const nextIndex =
                        (currentIndex + 1) % colourOptions.length;
                      const nextOption = colourOptions[nextIndex];
                      handleColourClick(nextOption);
                    }}
                  >
                    <StyledCardHeader {...item} />
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
                    $active={fontWeightValue > 1}
                    onClick={() => {
                      const currentIndex =
                        fontWeightOptions.indexOf(fontWeightValue);
                      const nextIndex =
                        (currentIndex + 1) % fontWeightOptions.length;
                      const nextOption = fontWeightOptions[nextIndex];
                      handleFontWeightClick(nextOption);
                    }}
                  >
                    <StyledCardHeader {...item} />
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
                    $active={animationDelayValue > 1}
                    onClick={() => {
                      const currentIndex =
                        animationDelayOptions.indexOf(animationDelayValue);
                      const nextIndex =
                        (currentIndex + 1) % animationDelayOptions.length;
                      const nextOption = animationDelayOptions[nextIndex];
                      handleAnimationDelayClick(nextOption);
                    }}
                  >
                    <StyledCardHeader {...item} />
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
                    $active={fontValue > 1}
                    onClick={() => {
                      const currentIndex = fontOptions.indexOf(fontValue);
                      const nextIndex = (currentIndex + 1) % fontOptions.length;
                      const nextOption = fontOptions[nextIndex];
                      handleFontClick(nextOption);
                    }}
                  >
                    <StyledCardHeader {...item} />
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
                    <StyledCardHeader {...item} />
                  </StyledItemInner>
                )}
              </StyledItem>
            ))}
          </StyledItems>
        </StyledInner>
      </StyledOuter>
    </StyledAccessibilityOverlay>
  );
};

export default AccessibilityOverlay;
