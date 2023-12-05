import { css } from 'styled-components';

export const fontSize = sizeValue => {
  return css`
    font-size: ${sizeValue}px;
    font-size: ${sizeValue / 10}rem;
  `;
};

export const fluidFontSize = (minFontSize, maxFontSize, minVw, maxVw) => {
  return css`
    font-size: ${minFontSize};

    @media screen and (min-width: ${minVw}px) {
      font-size: calc(
        ${minFontSize} + (${parseInt(maxFontSize)} - ${parseInt(minFontSize)}) *
          ((100vw - ${minVw}px) / (${maxVw} - ${minVw}))
      );
    }

    @media screen and (min-width: ${maxVw}px) {
      font-size: ${maxFontSize};
    }
  `;
};
