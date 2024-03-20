import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled, { css } from 'styled-components';
import {
  minBreakpointQuery,
  standardTransition,
  zIndexLayers,
} from '../styles';
import { Button } from './ui';

const StyledAccessibilityCta = styled.div`
  position: fixed;
  z-index: ${zIndexLayers.sixth};
  left: 20px;
  transition: ${standardTransition('top')};

  ${({ $overlayActive }) => {
    if (!$overlayActive) {
      return css`
        top: calc(100% - 94px);
      `;
    } else {
      return css`
        top: calc(0% + 110px);

        ${minBreakpointQuery.mlarge`
          top: calc(0% + 100px);
        `}
      `;
    }
  }}
`;

const StyledInner = styled.div`
  ${({ $overlayActive }) => {
    if ($overlayActive) {
      return css`
        padding: 20px;
      `;
    }
  }}
`;

const StyledButton = styled(Button)`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const StyledImage = styled.img`
  width: 50px;
`;

const AccessibilityCta = ({ overlayActive, setOverlayActive }) => {
  const {
    datoCmsAccessibilityOverlay: { image },
  } = useStaticQuery(graphql`
    query AccessibilityCtaQuery {
      datoCmsAccessibilityOverlay {
        heading
        text {
          value
        }
        image {
          url
          alt
        }
      }
    }
  `);

  return (
    <StyledAccessibilityCta $overlayActive={overlayActive}>
      <StyledButton onClick={() => setOverlayActive(!overlayActive)}>
        <StyledImage src={image.url} alt={image.alt} />
        Customise Accesibilty
      </StyledButton>
    </StyledAccessibilityCta>
  );
};

export default AccessibilityCta;
