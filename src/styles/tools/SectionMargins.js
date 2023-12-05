import { css } from 'styled-components';
import { breakpointSizes } from '../../styles';

export const sectionMargins = (minMargin = '40px', maxMargin = '120px') => {
  return css`
    margin: ${minMargin} 0;
    @media screen and (min-width: ${breakpointSizes.tiny}px) {
      margin: calc(
          ${minMargin} + (${parseInt(maxMargin)} - ${parseInt(minMargin)}) *
            (
              (100vw - ${breakpointSizes.tiny}px) /
                (${breakpointSizes.xxxxlarge} - ${breakpointSizes.tiny})
            )
        )
        0;
    }
    @media screen and (min-width: ${breakpointSizes.xxxxlarge}px) {
      margin: ${maxMargin} 0;
    }
  `;
};
