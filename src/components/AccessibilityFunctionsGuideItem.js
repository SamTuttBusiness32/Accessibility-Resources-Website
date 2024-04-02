import React from 'react';
import styled, { css } from 'styled-components';
import {
  brandColours,
  fontSize,
  maxBreakpointQuery,
  minBreakpointQuery,
  sectionPaddings,
  standardColours,
} from '../styles';
import {
  CardHeader,
  Container,
  Heading,
  HtmlContent,
  TextAlignment,
} from './ui';

const StyledAccessibilityFunctionsGuideItem = styled.article`
  ${({ $index }) => {
    if ($index % 2 === 1) {
      return css`
        ${sectionPaddings()}
        background-color: ${standardColours.white};
      `;
    } else {
      return css`
        ${sectionPaddings()};
        background-color: ${brandColours.secondary};
      `;
    }
  }}
`;

const StyledHeading = styled.h3`
  width: 100%;
  text-align: ${({ theme }) => TextAlignment(theme.alignTextValue, 'center')};
  margin-bottom: 15px;
  ${({ theme }) => fontSize(24, theme.fontSizeMultiplier)};

  ${minBreakpointQuery.small`
    ${({ theme }) => fontSize(28, theme.fontSizeMultiplier)};
  `}

  ${minBreakpointQuery.large`
    ${({ theme }) => fontSize(32, theme.fontSizeMultiplier)};
  `}

  ${minBreakpointQuery.smedium`
    grid-row: 1;
  `}
  
  ${({ $index }) => {
    if ($index % 2 === 0) {
      return css`
        ${minBreakpointQuery.smedium`
          grid-column: 1;
        `}
      `;
    } else {
      return css`
        ${minBreakpointQuery.smedium`
          grid-column: 2;
        `}
      `;
    }
  }}
`;

const StyledItem = styled.li`
  display: grid;
  column-gap: 30px;
  row-gap: 15px;
  align-items: center;
  justify-items: center;

  ${minBreakpointQuery.small`
    column-gap: 45px;
  `}

  ${minBreakpointQuery.smedium`
    grid-template-columns:  1fr 300px;
  `}

  ${minBreakpointQuery.large`
    column-gap: 60px;
  `}

  ${({ $index }) => {
    if ($index % 2 === 1) {
      return css`
        ${minBreakpointQuery.smedium`
          grid-template-columns: 300px 1fr;
        `}
      `;
    }
  }}
`;

const StyledItemInner = styled.div`
  display: grid;
  padding: 20px;
  border-radius: 5px;
  border: solid 2px ${brandColours.tertiary};
  color: ${brandColours.primary};
  background-color: ${standardColours.white};
  max-width: 300px;
  flex-shrink: 0;

  ${minBreakpointQuery.smedium`
    grid-row: 2;
  `}

  ${({ $index }) => {
    if ($index % 2 === 0) {
      return css`
        ${minBreakpointQuery.smedium`
          grid-column: 2;
        `}
      `;
    } else {
      return css`
        ${minBreakpointQuery.smedium`
          grid-column: 1;
        `}
      `;
    }
  }}
`;

const StyledContent = styled(HtmlContent)`
  flex-grow: 1;
  text-align: ${({ theme }) => TextAlignment(theme.alignTextValue, 'left')};

  ${minBreakpointQuery.smedium`
    grid-row: 2;
  `}

  ${({ $index }) => {
    if ($index % 2 === 0) {
      return css`
        ${minBreakpointQuery.smedium`
          grid-column: 1;
        `}
      `;
    } else {
      return css`
        ${minBreakpointQuery.smedium`
          grid-column: 2;
        `}
      `;
    }
  }}
`;

const AccessibilityFunctionsGuideItem = ({ item, index }) => (
  <StyledAccessibilityFunctionsGuideItem $index={index}>
    <Container>
      <StyledItem $index={index}>
        <StyledHeading $index={index}>{item.title}</StyledHeading>
        <StyledContent content={item.content} $index={index} />
        <StyledItemInner $index={index}>
          <CardHeader {...item} />
        </StyledItemInner>
      </StyledItem>
    </Container>
  </StyledAccessibilityFunctionsGuideItem>
);

export default AccessibilityFunctionsGuideItem;
