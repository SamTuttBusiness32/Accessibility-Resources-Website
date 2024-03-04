import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled, { css } from 'styled-components';
import {
  brandColours,
  breakpointSizes,
  fluidFontSize,
  fontSize,
  fontWeights,
  maxBreakpointQuery,
  minBreakpointQuery,
  sectionMargins,
  sectionPaddings,
  standardColours,
} from '../styles';
import { Container, Heading } from './ui';

const StyledStatistics = styled.section`
  ${({ invert }) => {
    if (invert) {
      return css`
        ${sectionPaddings()};
        background-color: ${brandColours.primary};
        color: ${standardColours.white};
      `;
    } else {
      return css`
        ${sectionMargins()};
        color: ${brandColours.primary};
      `;
    }
  }}
`;

const StyledHeading = styled(Heading)`
  text-align: center;
  color: ${({ invert }) =>
    invert ? standardColours.white : brandColours.primary};
`;

const StyledItems = styled.ul`
  display: grid;
  margin-top: 40px;
  gap: 20px;

  ${minBreakpointQuery.medium`
    grid-template-columns: repeat(3, 1fr);
  `}

  ${minBreakpointQuery.mlarge`
    gap: 30px;
  `}

  ${minBreakpointQuery.large`
    margin-top: 80px;
  `}

  ${minBreakpointQuery.xlarge`
    gap: 40px;
  `}
`;

const StyledItem = styled.li`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;

  ${maxBreakpointQuery.medium`
    max-width: 250px;
    margin: 0 auto;
  `}
`;

const StyledStatistic = styled.span`
  ${fluidFontSize(
    '40px',
    '80px',
    breakpointSizes.tiny,
    breakpointSizes.xxxxlarge,
  )};
  font-weight: ${fontWeights.bold};
  line-height: 1.2;
`;

const StyledCaption = styled.p`
  ${fontSize(12)};

  ${minBreakpointQuery.small`
    ${fontSize(14)};
  `}

  ${minBreakpointQuery.large`
    ${fontSize(16)};
  `}
`;

const StyledText = styled.p`
  margin-top: 40px;
  text-align: center;

  ${minBreakpointQuery.medium`
    text-align: right;
  `}

  ${minBreakpointQuery.large`
    margin-top: 80px;
  `}
`;

const Statistics = ({ heading, items, text, invert }) => (
  <StyledStatistics invert={invert}>
    <Container>
      <StyledHeading invert={invert}>{heading}</StyledHeading>
      <StyledItems>
        {items.map(({ statistic, caption }) => (
          <StyledItem>
            <StyledStatistic>{statistic}</StyledStatistic>
            <StyledCaption>{caption}</StyledCaption>
          </StyledItem>
        ))}
      </StyledItems>
      {text && <StyledText>{text}</StyledText>}
    </Container>
  </StyledStatistics>
);

export default Statistics;
