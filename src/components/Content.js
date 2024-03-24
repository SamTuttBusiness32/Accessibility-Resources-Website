import React from 'react';
import styled, { css } from 'styled-components';
import { brandColours, minBreakpointQuery } from '../styles';
import { Container, HtmlContent, TextAlignment } from './ui';

const StyledContent = styled.section`
  margin: 30px 0;
  text-align: ${({ theme }) => TextAlignment(theme.alignTextValue, 'left')};

  ${minBreakpointQuery.large`
    margin: 45px 0;
  `}
`;

const StyledInner = styled.div`
  ${({ $twoColumns }) => {
    if ($twoColumns) {
      return css`
        ${minBreakpointQuery.mlarge`
          column-count: 2;
          column-gap: 60px;
        `}

        ${minBreakpointQuery.large`
          column-gap: 80px;
        `}

        ${minBreakpointQuery.xxlarge`
          column-gap: 100px;
        `}
      `;
    }
  }};

  ${({ $highlight }) => {
    if ($highlight) {
      return css`
        padding: 30px;
        background-color: ${brandColours.tertiary};

        ${minBreakpointQuery.small`
          padding: 40px;
        `}

        ${minBreakpointQuery.medium`
          padding: 60px;
        `}

        ${minBreakpointQuery.large`
          padding: 80px;
        `}

        ${minBreakpointQuery.xxlarge`
          padding: 100px;
        `}
      `;
    }
  }};
`;

const Content = ({ content, twoColumns, highlight, contain }) => (
  <StyledContent>
    <Container narrow={contain && !highlight}>
      <StyledInner $twoColumns={twoColumns} $highlight={highlight}>
        <HtmlContent content={content} />
      </StyledInner>
    </Container>
  </StyledContent>
);

export default Content;
