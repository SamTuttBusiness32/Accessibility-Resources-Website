import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled, { css } from 'styled-components';
import {
  brandColours,
  maxBreakpointQuery,
  minBreakpointQuery,
  standardColours,
  visuallyHidden,
  zIndexLayers,
} from '../styles';
import { Button, HtmlContent } from './ui';
import AccessibilityFunctionCard from './AccessibilityFunctionCard';

const StyledAccessibilityOverlay = styled.div`
  position: fixed;
  z-index: ${zIndexLayers.fifth};
  background-color: ${brandColours.primary};
  top: 0;
  left: 0;
  height: 100%;
  opacity: 0;
  margin-top: 90px;
  padding-top: 124px;
  max-width: 520px;
  width: 100%;

  ${minBreakpointQuery.mlarge`
    margin-top: 80px;
    padding-top: 114px;
  `}

  ${({ $overlayActive }) => {
    if ($overlayActive) {
      return css`
        opacity: 1;
      `;
    }
  }}
`;

const StyledInner = styled.div`
  padding: 20px;
`;

const StyledItems = styled.div`
  display: grid;
  gap: 20px;
  margin-top: 20px;

  ${minBreakpointQuery.small`
    grid-template-columns: repeat(2, 1fr);
  `};
`;

const StyledTextSizeItem = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 10px;
`;

const StyledTextSizeIconWraper = styled.div`
  width: 50px;
  height: 50px;
  padding: 10px;
  border: solid 1px ${brandColours.primary};
  border-radius: 50%;
  position: relative;
  margin-bottom: 5px;

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

const StyledItem = styled(AccessibilityFunctionCard)``;

const AccessibilityOverlay = ({ overlayActive }) => {
  const {
    datoCmsAccessibilityOverlay: { text, accessibilityFunctions },
  } = useStaticQuery(graphql`
    query AccessibilityOverlayQuery {
      datoCmsAccessibilityOverlay {
        heading
        text {
          value
        }
        accessibilityFunctions {
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

  return (
    <StyledAccessibilityOverlay $overlayActive={overlayActive}>
      <StyledInner $overlayActive={overlayActive}>
        <HtmlContent content={text} />
        <StyledItems>
          {accessibilityFunctions.map((item, id) => (
            <StyledItem key={id} {...item}>
              {accessibilityFunctions[id].title === 'Text Size' ? (
                <StyledTextSizeItem>
                  <StyledTextSizeIconWraper $active={true}>
                    <StyledTextSizeIcon
                      src={accessibilityFunctions[id].icon.url}
                    />
                  </StyledTextSizeIconWraper>
                  <StyledTextSizeIconWraper $active={false}>
                    <StyledTextSizeIcon
                      src={accessibilityFunctions[id].icon.url}
                    />
                  </StyledTextSizeIconWraper>
                  <StyledTextSizeIconWraper $active={false}>
                    <StyledTextSizeIcon
                      src={accessibilityFunctions[id].icon.url}
                    />
                  </StyledTextSizeIconWraper>
                </StyledTextSizeItem>
              ) : (
                ''
              )}
            </StyledItem>
          ))}
        </StyledItems>
      </StyledInner>
    </StyledAccessibilityOverlay>
  );
};

export default AccessibilityOverlay;
