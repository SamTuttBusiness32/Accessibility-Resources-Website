import { css } from 'styled-components';
import { breakpointSizes } from '../../styles';

export const sectionPaddings = (minPadding = '40px', maxPadding = '120px') => {
  return css`
    padding: ${minPadding} 0;
    @media screen and (min-width: ${breakpointSizes.tiny}px) {
      padding: calc(
          ${minPadding} + (${parseInt(maxPadding)} - ${parseInt(minPadding)}) *
            (
              (100vw - ${breakpointSizes.tiny}px) /
                (${breakpointSizes.xxxxlarge} - ${breakpointSizes.tiny})
            )
        )
        0;
    }
    @media screen and (min-width: ${breakpointSizes.xxxxlarge}px) {
      padding: ${maxPadding} 0;
    }
  `;
};
