import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  margin-right: auto;
  margin-left: auto;
  padding-left: 30px;
  padding-right: 30px;
  width: 100%;
  max-width: ${({ narrow, wide }) =>
    narrow ? '1000' : wide ? '1800' : '1200'}px;
`;

export const Container = ({ narrow, wide, children, ...props }) => (
  <StyledContainer narrow={narrow} wide={wide} {...props}>
    {children}
  </StyledContainer>
);
