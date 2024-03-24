import React from 'react';
import styled, { css } from 'styled-components';
import {
  brandColours,
  minBreakpointQuery,
  standardColours,
  standardTransition,
  visuallyHidden,
  zIndexLayers,
} from '../styles';
import { Button, Svg } from './ui';
import settingsIcon from '../images/gear-solid.inline.svg';

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

//moved up for hover
const StyledImage = styled(Svg)`
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  fill: ${standardColours.white};
  border: solid 1px ${standardColours.white};
  border-radius: 50%;
  padding: 8px;
  transition: ${standardTransition('fill')},
    ${standardTransition('border-color')};
`;

const StyledButton = styled(Button)`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 12px;
  width: 75px;
  transition: ${standardTransition('width')},
    ${standardTransition('background-color')};

  &:after {
    content: ${({ $overlayActive }) => ($overlayActive ? "'Close'" : "'Open'")};
    display: block;
    position: relative;
    transition: ${standardTransition('color')};
    color: ${standardColours.white};
  }

  &:hover {
    width: 130px;
  }

  ${({ $overlayActive }) => {
    if (!$overlayActive) {
      return css`
        &:not(:hover):after {
          ${visuallyHidden()};
        }
      `;
    } else {
      return css`
        width: 130px;
        color: ${brandColours.primary};
        background-color: ${standardColours.white};

        ${StyledImage} {
          fill: ${brandColours.primary};
          border-color: ${brandColours.primary};
        }

        &:after {
          color: ${brandColours.primary};
        }

        &:hover:after {
          color: ${brandColours.primary};
        }

        &:hover {
          background-color: ${standardColours.white};
        }
      `;
    }
  }}
`;

const AccessibilityCta = ({ overlayActive, setOverlayActive }) => (
  <StyledAccessibilityCta $overlayActive={overlayActive}>
    <StyledButton
      $overlayActive={overlayActive}
      onClick={() => setOverlayActive(!overlayActive)}
    >
      <StyledImage image={settingsIcon} />
    </StyledButton>
  </StyledAccessibilityCta>
);

export default AccessibilityCta;
