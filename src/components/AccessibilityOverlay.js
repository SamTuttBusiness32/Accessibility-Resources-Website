import React, { useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled, { css } from 'styled-components';
import {
  brandColours,
  minBreakpointQuery,
  standardColours,
  standardTransition,
  zIndexLayers,
} from '../styles';
import { CardHeader, HtmlContent } from './ui';

const StyledAccessibilityOverlay = styled.div`
  position: fixed;
  z-index: ${zIndexLayers.fifth};
  background-color: ${brandColours.primary};
  top: 0;
  left: -100%;
  height: 100vh;
  margin-top: 90px;
  padding-top: 124px;
  max-width: 520px;
  width: 100%;
  transition: ${standardTransition('left')};

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
`;

const StyledInner = styled.div`
  padding: 20px;
  padding-right: 10px;
  height: 100%;

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

const StyledItems = styled.div`
  margin-top: 20px;
  display: grid;
  gap: 20px;
  height: calc(100% - 136px);
  padding-right: 10px;
  padding-bottom: 10px;
  overflow-y: scroll;

  ${minBreakpointQuery.small`
    grid-template-columns: repeat(2, 1fr);
  `};

  ${minBreakpointQuery.mlarge`
    height: calc(100% - 126px);
  `}
`;

const StyledTextSizeItem = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 10px;
  gap: 10px;
`;

const StyledTextSizeIconWraper = styled.button`
  width: 50px;
  height: 50px;
  padding: 14px;
  border: solid 1px ${brandColours.primary};
  border-radius: 50%;
  position: relative;
  margin-bottom: 5px;
  background-color: ${standardColours.white};
  display: flex;
  align-items: center;

  &:nth-child(2n) {
    padding: 11px; /* Padding for every 2nd element */
  }

  &:nth-child(3n) {
    padding: 8px; /* Padding for every 3rd element */
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -10px;
    width: 100%;
    height: 1px;
    background-color: ${brandColours.primary};
    transition: ${standardTransition('height')};

    ${({ $active }) => {
      if ($active) {
        return css`
          height: 5px;
        `;
      }
    }}
  }
`;

const StyledTextSizeIcon = styled.img`
  width: 100%;
  height: 100%;
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
`;

const StyledTextSizeContent = styled.div`
  margin-top: auto;
`;

const StyledTextSizeText = styled.p`
  margin-top: 10px;
  text-align: center;
`;

const AccessibilityOverlay = ({
  overlayActive,
  fontSizeMultiplier,
  setFontSizeMultiplier,
  saturationValue,
  setSaturationValue,
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

  const handleFontSizeClick = option => {
    setFontSizeMultiplier(option);
  };

  const handleSaturationClick = option => {
    setSaturationValue(option);
  };

  return (
    <StyledAccessibilityOverlay $overlayActive={overlayActive}>
      <StyledInner $overlayActive={overlayActive}>
        <HtmlContent content={text} />
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
                    <StyledTextSizeItem>
                      {fontSizeOptions.map((option, index) => (
                        <StyledTextSizeIconWraper
                          key={index}
                          $active={option === fontSizeMultiplier}
                        >
                          <StyledTextSizeIcon
                            src={nodes[id].icon.url}
                            alt={`Text size ${option}x`}
                          />
                        </StyledTextSizeIconWraper>
                      ))}
                    </StyledTextSizeItem>
                  </StyledTextSizeContent>
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
                    <StyledTextSizeItem>
                      {saturationOptions.map((option, index) => (
                        <div key={index}>
                          {index !== 0 && (
                            <StyledTextSizeIconWraper
                              $active={option === saturationValue}
                            >
                              <StyledTextSizeIcon
                                src={nodes[id].icon.url}
                                alt={`Saturation ${option}x`}
                              />
                            </StyledTextSizeIconWraper>
                          )}
                        </div>
                      ))}
                    </StyledTextSizeItem>
                  </StyledTextSizeContent>
                </StyledItemInner>
              ) : (
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
