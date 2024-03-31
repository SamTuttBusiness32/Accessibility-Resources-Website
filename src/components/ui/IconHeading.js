import React from 'react';
import styled from 'styled-components';
import { breakpointSizes, fluidFontSize } from '../../styles';
import { LineHeight } from './LineHeight';

const StyledIconHeading = styled.h1`
  ${({ theme }) =>
    fluidFontSize(
      30,
      50,
      breakpointSizes.tiny,
      breakpointSizes.xxxxlarge,
      theme.fontSizeMultiplier,
    )};
  line-height: ${({ theme }) => LineHeight(theme.lineHeightValue, 1.2)};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const StyledIcon = styled.img`
  filter: brightness(0) invert(1);
  height: 40px;
`;

export const IconHeading = ({ children, icon, ...props }) => (
  <StyledIconHeading {...props}>
    {children}
    {icon && <StyledIcon src={icon.url} alt={icon.alt} loading="lazy" />}
  </StyledIconHeading>
);
