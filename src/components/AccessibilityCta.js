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
  z-index: ${zIndexLayers.fifth};
  left: 20px;
  transition: ${({ theme }) =>
    standardTransition('top', theme.animationDelayValue)};

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
  transition: ${({ theme }) =>
    `${standardTransition('fill', theme.animationDelayValue)},
    ${standardTransition('border-color', theme.animationDelayValue)}`};
`;

const StyledButton = styled(Button)`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 12px;
  width: 78px;
  border: solid 2px #003131;
  transition: ${({ theme }) =>
    `${standardTransition('width', theme.animationDelayValue)},
    ${standardTransition('background-color', theme.animationDelayValue)}`};

  &:after {
    content: ${({ $overlayActive }) => ($overlayActive ? "'Close'" : "'Open'")};
    display: block;
    position: relative;
    transition: ${({ theme }) =>
      standardTransition('color', theme.animationDelayValue)};
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
          color: ${standardColours.white};
        }

        &:hover {
          background-color: ${brandColours.primary};

          ${StyledImage} {
            fill: ${standardColours.white};
            border-color: ${standardColours.white};
          }
        }
      `;
    }
  }}
`;

const AccessibilityCta = ({ overlayActive, setOverlayActive, ...props }) => (
  <StyledAccessibilityCta $overlayActive={overlayActive} {...props}>
    <StyledButton
      $overlayActive={overlayActive}
      onClick={() => setOverlayActive(!overlayActive)}
    >
      <StyledImage image={settingsIcon} />
    </StyledButton>
  </StyledAccessibilityCta>
);

export default AccessibilityCta;
