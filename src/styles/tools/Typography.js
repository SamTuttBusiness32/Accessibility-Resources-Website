import { css } from 'styled-components';
import { brandColours, breakpointSizes, fluidFontSize } from '../../styles';

export const headingStyles = () => {
  return css`
    ${({ theme }) =>
      fluidFontSize(
        26,
        36,
        breakpointSizes.tiny,
        breakpointSizes.xxxxlarge,
        theme.fontSizeMultiplier,
      )};
    color: ${brandColours.primary};
  `;
};
