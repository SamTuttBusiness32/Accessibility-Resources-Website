import React from 'react';
import styled from 'styled-components';
import { headingStyles } from '../../styles';

const StyledHeading = styled.h2`
  ${headingStyles()};
`;

export const Heading = ({ children, ...props }) => (
  <StyledHeading {...props}>{children}</StyledHeading>
);
