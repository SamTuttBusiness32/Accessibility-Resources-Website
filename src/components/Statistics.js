import React from 'react';
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
import {
  Container,
  FontWeight,
  Heading,
  LineHeight,
  TextAlignment,
} from './ui';

const StyledStatistics = styled.section`
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
        ${sectionPaddings(`40px`, `80px`)};
        background-color: ${standardColours.white};
      `;
    }
  }}
`;

const StyledHeading = styled(Heading)`
  color: ${({ invert }) =>
    invert ? standardColours.white : brandColours.primary};
`;

const StyledText = styled.p`
  margin-top: 10px;

  ${minBreakpointQuery.medium`
    text-align: ${({ theme }) => TextAlignment(theme.alignTextValue, 'center')};
  `}

  ${minBreakpointQuery.large`
    margin-top: 15px;
  `}
`;

const StyledItems = styled.ul`
  display: grid;
  margin-top: 30px;
  gap: 20px;

  ${minBreakpointQuery.small`
    margin-top: 40px;
  `}

  ${minBreakpointQuery.medium`
    grid-template-columns: repeat(3, 1fr);
  `}

  ${minBreakpointQuery.mlarge`
    gap: 30px;
  `}

  ${minBreakpointQuery.large`
    margin-top: 50px;
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

  ${maxBreakpointQuery.medium`
    margin: 0 auto;
  `}

  ${minBreakpointQuery.small`
    gap: 25px;
  `}

  ${minBreakpointQuery.large`
    gap: 30px;
  `}
`;

const StyledStatistic = styled.div`
  position: relative;
  width: 175px;
  height: 175px;
  border-radius: 50%;
  background: #003131
    linear-gradient(to right, transparent 50%, ${brandColours.primary} 50%);

  &:before {
    content: '';
    display: block;
    height: 100%;
    margin-left: 50%;
    transform-origin: left;
    border-radius: 0 100% 100% 0/50%;
    background: ${({ value }) =>
      value > 50 ? brandColours.primary : `#003131`};
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

  ${minBreakpointQuery.small`
    width: 200px;
    height: 200px;
  `}

  ${minBreakpointQuery.medium`
    width: 225px;
    height: 225px;
  `}

  ${minBreakpointQuery.large`
    width: 250px;
    height: 250px;
  `}
`;

const StyledValue = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  ${({ theme }) =>
    fluidFontSize(
      40,
      60,
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

const Statistics = ({ heading, items, text, invert }) => (
  <StyledStatistics invert={invert}>
    <Container>
      <StyledHeading invert={invert}>{heading}</StyledHeading>
      {text && <StyledText>{text}</StyledText>}
      <StyledItems>
        {items.map(({ statistic, caption }) => (
          <StyledItem>
            <StyledStatistic value={statistic}>
              <StyledValue>{statistic}%</StyledValue>
            </StyledStatistic>

            <StyledCaption>{caption}</StyledCaption>
          </StyledItem>
        ))}
      </StyledItems>
    </Container>
  </StyledStatistics>
);

export default Statistics;
