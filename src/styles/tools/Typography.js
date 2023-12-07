import { css } from 'styled-components';
import { brandColours, breakpointSizes, fluidFontSize } from '../../styles';

export const headingStyles = () => {
  return css`
    ${fluidFontSize(
      '26px',
      '36px',
      breakpointSizes.tiny,
      breakpointSizes.xxxxlarge,
    )};
    color: ${brandColours.primary};
  `;
};
