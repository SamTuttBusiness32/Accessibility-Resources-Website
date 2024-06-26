import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled, { css } from 'styled-components';
import {
  brandColours,
  breakpointSizes,
  fluidFontSize,
  fontSize,
  fontWeights,
  minBreakpointQuery,
  sectionMargins,
  sectionPaddings,
  standardColours,
} from '../styles';
import {
  Container,
  FontWeight,
  Heading,
  LineHeight,
  TextAlignment,
} from './ui';

const StyledChecklistStatistics = styled.section`
  text-align: ${({ theme }) => TextAlignment(theme.alignTextValue, 'center')};
  ${({ invert }) => {
    if (invert) {
      return css`
        ${sectionPaddings(`30px`, `60px`)};
        background-color: ${brandColours.primary};
        color: ${standardColours.white};
      `;
    } else {
      return css`
        ${sectionMargins(`30px`, `60px`)};
        color: ${brandColours.primary};
      `;
    }
  }}
`;

const StyledHeading = styled(Heading)`
  color: ${({ invert }) =>
    invert ? standardColours.white : brandColours.primary};
`;

const StyledItems = styled.ul`
  display: flex;
  margin-top: 30px;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;

  ${minBreakpointQuery.mlarge`
    gap: 30px;
  `}

  ${minBreakpointQuery.large`
    margin-top: 45px;
  `}

  ${minBreakpointQuery.xlarge`
    gap: 40px;
  `}
`;

const StyledItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const StyledStatistic = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: #444
    linear-gradient(to right, transparent 50%, ${brandColours.primary} 50%);

  &:before {
    content: '';
    display: block;
    height: 100%;
    margin-left: 50%;
    transform-origin: left;
    border-radius: 0 100% 100% 0/50%;
    background: ${({ value }) => (value > 50 ? brandColours.primary : `#444`)};
    transform: ${({ value }) =>
      value > 50
        ? `rotate(calc(((${value} - 50) * 0.01turn)))`
        : `rotate(calc(((${value} - 0) * 0.01turn)))`};
  }

  &:after {
    content: '';
    position: absolute;
    inset: 12px;
    border-radius: 50%;
    background: ${standardColours.white};
  }
`;

const StyledValue = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  ${({ theme }) =>
    fluidFontSize(
      30,
      45,
      breakpointSizes.tiny,
      breakpointSizes.xxxxlarge,
      theme.fontSizeMultiplier,
    )};
  font-weight: ${({ theme }) =>
    FontWeight(theme.fontWeightValue, fontWeights.bold)};
  line-height: ${({ theme }) => LineHeight(theme.lineHeightValue, 1.2)};
`;

const StyledCaption = styled.p`
  ${({ theme }) => fontSize(12, theme.fontSizeMultiplier)};

  ${minBreakpointQuery.small`
    ${({ theme }) => fontSize(14, theme.fontSizeMultiplier)};
  `}

  ${minBreakpointQuery.large`
    ${({ theme }) => fontSize(16, theme.fontSizeMultiplier)};
  `}
`;

const ChecklistStatistics = ({ items, parentPercentages }) => {
  const {
    allDatoCmsChecklist: { nodes },
  } = useStaticQuery(graphql`
    query ChecklistStatisticsQuery {
      allDatoCmsChecklist(
        filter: { root: { eq: true } }
        sort: { position: ASC }
      ) {
        nodes {
          title
        }
      }
    }
  `);

  let processedItems = items;

  if (parentPercentages.length === 0) {
    processedItems = nodes.map(node => ({
      statistic: 0,
      caption: node.title,
    }));
  }

  return (
    <StyledChecklistStatistics>
      <Container>
        <StyledHeading>Percentage Completed</StyledHeading>
        <StyledItems>
          {processedItems.map(({ statistic, caption }, index) => (
            <StyledItem key={index}>
              <StyledStatistic value={statistic}>
                <StyledValue>{statistic}%</StyledValue>
              </StyledStatistic>
              <StyledCaption>{caption}</StyledCaption>
            </StyledItem>
          ))}
        </StyledItems>
      </Container>
    </StyledChecklistStatistics>
  );
};

export default ChecklistStatistics;
