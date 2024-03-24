import { css } from 'styled-components';

export const fontSize = (sizeValue, fontSizeMultiplier = 1) => {
  return css`
    font-size: ${sizeValue * fontSizeMultiplier}px;
    font-size: ${(sizeValue * fontSizeMultiplier) / 10}rem;
  `;
};

export const fluidFontSize = (
  minFontSize,
  maxFontSize,
  minVw,
  maxVw,
  fontSizeMultiplier = 1,
) => {
  minFontSize = minFontSize * fontSizeMultiplier;
  maxFontSize = maxFontSize * fontSizeMultiplier;
  return css`
    font-size: ${minFontSize}px;

    @media screen and (min-width: ${minVw}px) {
      font-size: calc(
        ${minFontSize}px + (${parseInt(maxFontSize)} - ${parseInt(minFontSize)}) *
          ((100vw - ${minVw}px) / (${maxVw} - ${minVw}))
      );
    }

    @media screen and (min-width: ${maxVw}px) {
      font-size: ${maxFontSize}px;
    }
  `;
};
