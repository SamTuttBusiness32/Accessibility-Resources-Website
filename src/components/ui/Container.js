import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  margin-right: auto;
  margin-left: auto;
  padding-left: 30px;
  padding-right: 30px;
  width: 100%;
  max-width: ${({ extraNarrow, narrow, wide }) =>
    extraNarrow ? '600' : narrow ? '1000' : wide ? '1800' : '1200'}px;
`;

export const Container = ({
  extraNarrow,
  narrow,
  wide,
  children,
  ...props
}) => (
  <StyledContainer
    extraNarrow={extraNarrow}
    narrow={narrow}
    wide={wide}
    {...props}
  >
    {children}
  </StyledContainer>
);
